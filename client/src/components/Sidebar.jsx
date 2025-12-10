import React, { useState, useEffect, useRef, useContext } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages } =
    useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const menuRef = useRef();

  /** FIX 1: fullName check with fallback */
  const filteredUsers = input
    ? users.filter((user) =>
        (user.fullName || user.fullname || "").toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /** Load users when online list changes */
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ''}`}
    >
      {/* TOP SECTION */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <img src={assets.chatlogo} alt="logo" className="w-8 h-8 object-contain" />
          <span className="text-lg font-semibold">QuickChat</span>
        </div>

        {/* MENU */}
        <div className="relative" ref={menuRef}>
          <img
            src={assets.menu}
            alt="menu"
            className="w-5 h-5 cursor-pointer object-contain"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div
              className="absolute top-7 right-0 w-32 p-4 rounded-md bg-[#282142]
              border border-gray-600 text-gray-100 shadow-lg z-20"
            >
              <p
                onClick={() => {
                  navigate('/profile');
                  setMenuOpen(false);
                }}
                className="cursor-pointer text-sm hover:text-gray-300"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-gray-600" />
              <p onClick={() => logout()} className="cursor-pointer text-sm hover:text-gray-300">
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mb-5'>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'
          placeholder='🔍Search User..'
        />
      </div>

      {/* USER LIST */}
      <div className='flex flex-col'>
        {filteredUsers.map((user) => {
          const name = user.fullName || user.fullname || "Unknown";
          const pic = user.profilePic || assets.avatar_icon;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <div onClick={() => {setSelectedUser(user); setUnseenMessages(prev=> ({...prev, [user._id]:0}))}}
              key={user._id}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
            ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}
            >
              {/* Profile Pic */}
              <img
                src={pic}
                className='w-[35px] aspect-[1/1] rounded-full object-cover'
                alt="avatar"
              />

              <div className='flex flex-col leading-5'>
                <p className="font-medium">{name}</p>

                {/* ONLINE / OFFLINE STATUS */}
                {isOnline ? (
                  <span className='text-green-400 text-xs'>Online</span>
                ) : (
                  <span className='text-neutral-400 text-xs'>Offline</span>
                )}
              </div>

              {/* UNSEEN MESSAGE COUNT */}
              {unseenMessages[user._id] > 0 && (
                <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
