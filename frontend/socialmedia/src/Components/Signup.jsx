import React, { useState } from "react";
import login from "../assets/signup.svg";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [picture, Setpicture] = useState("");

  const SignUp = (e) => {
    axios.post("https://socialmedia-backend-glx4.onrender.com/createuser", {
      name: name,
      email: email,
      password: password,
      picture: picture,
    }).then(res=>{
      console.log(res)
      window.location.href = "/";
    }).catch(err=>{
      console.log(err)
    });
  };

  // one input handle for all

  return (
    <div className='flex flex-col justify-center items-center  w-full h-screen bg-gray-50'>
      <div className='bg-white rounded-lg shadow-lg p-6  md:w-1/2  hover:shadow-sm '>
        <img src={login} alt='logo' className='w-1/5 mx-auto' />

        <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            Username
          </label>
          <input
            onChange={(e) => Setname(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            value={name}
            placeholder='Username'
          />
        </div>

        {/* Email */}

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            Email
          </label>

          <input
            onChange={(e) => Setemail(e.target.value)}
            value={email}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='Email'
            type='text'
            placeholder='Username'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            Profile Picture URL
          </label>
          <input
            onChange={(e) => Setpicture(e.target.value)}
            value={picture}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='picture'
            type='text'
            placeholder='Profile Picture(Optional)'
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            onChange={(e) => Setpassword(e.target.value)}
            value={password}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='**********'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={SignUp}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'>
            Sign Up
          </button>
          <a
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='#'>
            Already have an account?{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
