import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // For Sign up: move to bio step if not submitted yet
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    // Perform login or final sign-up
    await login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio });
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left Logo */}
      <img src={assets.chatlogo} alt="Logo" className='w-[min(30vw,250px)]' />

      {/* Right Form */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-gray-900/90 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && currState === "Sign up" && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="back"
              className='w-5 cursor-pointer'
            />
          )}
        </h2>

        {/* FULL NAME: show only for Sign up */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder='Full Name'
            required
            className='p-2 bg-gray-800 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        {/* EMAIL & PASSWORD */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder='Email Address'
          required
          className='p-2 bg-gray-800 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder='Password'
          required
          className='p-2 bg-gray-800 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />

        {/* BIO: show after first submit in Sign up */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder='Provide a short bio...'
            required
            className='p-2 bg-gray-800 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          {currState === "Sign up"
            ? isDataSubmitted
              ? "Create Account"
              : "Next"
            : "Login Now"}
        </button>

        {/* Terms */}
        <div className='flex items-center gap-2 text-sm text-gray-300'>
          <input type="checkbox" />
          <p>Agree to the terms and conditions</p>
        </div>

        {/* Switch between Sign up and Login */}
        <div className='flex flex-col gap-2 text-gray-300'>
          {currState === "Sign up" ? (
            <p className='text-sm'>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className='font-medium text-indigo-400 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm'>
              Create an Account{" "}
              <span
                onClick={() => setCurrState("Sign up")}
                className='font-medium text-indigo-400 cursor-pointer'
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
