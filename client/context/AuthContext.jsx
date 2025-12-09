// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Load persisted user (if any) on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setAuthUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  // Keep axios token header and run checkAuth when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    } else {
      delete axios.defaults.headers.common["token"];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        connectSocket(data.user);
      }
    } catch (error) {
      // silently ignore if not authenticated; show msg only if network error
      if (error?.response) {
        // server responded with something (not network)
      } else {
        toast.error("Network error while checking auth");
      }
    }
  };

  const connectSocket = (userData) => {
    if (!userData) return;

    // If socket exists and connected, skip
    if (socket && socket.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setAuthUser(data.userData);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.userData));
        axios.defaults.headers.common["token"] = data.token;
        connectSocket(data.userData);
        toast.success(data.message);
        return { success: true, data };
      } else {
        toast.error(data.message || "Login failed");
        return { success: false, data };
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Login error");
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    delete axios.defaults.headers.common["token"];
    if (socket) socket.disconnect();
    toast.success("Logged out successfully");
  };

  // updateProfile accepts either JSON with base64 profilePic or plain fields
  const updateProfile = async (body) => {
    try {
      // body is expected to be an object (JSON)
      const { data } = await axios.put("/api/auth/update-profile", body);

      if (data.success) {
        setAuthUser(data.user);
        localStorage.setItem("authUser", JSON.stringify(data.user));
        toast.success("Profile updated successfully");
        return { success: true, user: data.user };
      } else {
        toast.error(data.message || "Update failed");
        return { success: false, data };
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Update error");
      return { success: false, error };
    }
  };

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
