import axios from "axios";
import React, { useState } from "react";
import login from "../assets/login.svg";

const Login = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  let userID=localStorage.getItem("userID")



  const Handlelogin = () => {
    axios
      .post("https://socialmedia-backend-glx4.onrender.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res)
        if (res?.data) {
          localStorage.setItem("userID", res.data.user_id);
          console.log(localStorage.getItem("userID"))
          // window.location.href = "/";
        }
      }).then(()=>{
        if(localStorage.getItem("userID")){
          window.location.href = "/";

        }
      })
      
      ;
  };

  return (
   
    <div className='flex flex-col justify-center items-center  w-full h-screen bg-gray-50' style={{backgroundImage:`https://images.pexels.com/photos/10769588/pexels-photo-10769588.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load)`}}>
      <div className='bg-white rounded-lg shadow-lg p-6  md:w-1/2  hover:shadow-sm ' >
        <img src={login} alt='logo' className='md:w-1/5 mx-auto' />
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='Email'>
            Email
          </label>
          <input
            onChange={(e) => Setemail(e.target.value)}
            value={email}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='Email'
            type='text'
            placeholder='Email'
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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='**********'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={Handlelogin}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'>
            LogIn
          </button>
          <a
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='/signin'>
Create an Account          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
