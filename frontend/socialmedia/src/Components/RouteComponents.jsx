import React, { useEffect, useState } from "react";
import user from "../assets/people.svg";
import post from "../assets/posts.svg";
import friend from "../assets/buddies.svg";
import axios from "axios";

let user_id = localStorage.getItem("userID");

function RouteComponents() {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    axios
      .get(`https://socialmedia-backend-glx4.onrender.com/userdetails?user_id=${user_id}`)
      .then((res) => {
        console.log(res);
        setUserDetails(res.data);
      });
  }, []);

  const sections = [
    {
      users: user,
      name: "Users",
    },
    {
      posts: post,
      name: "Posts",
    },

    {
      friends: friend,
      name: "Friends",
    },
  ];
  return (
    <div className=''>
      {userDetails && (
        <div className='flex justify-end items-center'>
          <p className='font-semibold text-white text-xl text-right p-2'>
            Welcome {userDetails[0]?.name}
          </p>
          <p
            onClick={() => {
              localStorage.removeItem("userID");
              window.location.href = "/";
            }}
            className='text-right font-bold p-2 text-gray-800 m-2 shadow-xl rounded-full cursor-pointer hover:shadow-blue-300 shadow-pink-300 bg-white'>
            Log Out
          </p>
        </div>
      )}

      <div className='flex md:flex-row justify-center pt-8'>
        <div className='md:w-1/6 overflow-scroll shadow-xl shadow-green-300 p-2 bg-white justify-center flex-row items-center mx-4 rounded hover:shadow-sm hover:shadow-blue-300'>
          <a href='/allusers'>
            <img src={user} alt='user' className='h-3/4' />
            <h2 className='text-center text-xl font-semibold'>Users</h2>
          </a>
        </div>
        <div className='md:w-1/6 shadow-lg p-2 shadow-red-300  bg-white justify-center flex-row items-center mx-4 rounded hover:shadow-sm hover:shadow-blue-300'>
          <a href='/allposts'>
            <img src={post} alt='post' className='h-3/4' />
            <h2 className='text-center text-xl font-semibold'>Posts</h2>
          </a>
        </div>
        <div className='md:w-1/6 shadow-xl shadow-pink-300  p-2 bg-white justify-center flex-row items-center mx-4 rounded hover:shadow-sm hover:shadow-blue-300'>
          <a href='/allfriends'>
            <img src={friend} alt='friend' className='h-3/4' />
            <h2 className='text-center text-xl font-semibold'>Friends</h2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RouteComponents;
