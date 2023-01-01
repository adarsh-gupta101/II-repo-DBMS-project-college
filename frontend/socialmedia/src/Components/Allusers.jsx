import axios from "axios";
import React, { useEffect, useState } from "react";
import male from "../assets/male.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Allusers() {
  const [Allusers, setAllusers] = useState();
  useEffect(() => {
    axios.get("https://socialmedia-backend-glx4.onrender.com/allusers", {}).then((res) => {
      // console.log(res.data);
      setAllusers(res.data);
    });
  }, []);

  function AddFriend(friend) {
    axios
      .post("https://socialmedia-backend-glx4.onrender.com/addfriend", {
        user_id: localStorage.getItem("userID"),
        friend_id: friend,
      })
      .then((response) => {
        console.log(response.data.success); // true
        toast.success("Friend Added, although it might take some time to show up due to free server")
      })
      .catch((error) => {
        console.error(error.response.data.error); // error message
      });
  }
  return (
    <div className='bg-gray-900'>
              <ToastContainer />

      <a href='/'>
        <p className='bg-white text-black font-bold p-2 mt-4 mx-4 rounded shadow-sm w-fit'>
          Back to Home
        </p>
      </a>
      <div className=' min-h-screen flex flex-col md:flex-row flex-wrap justify-center items-center '>
        {Allusers &&
          Allusers.map((res) => {
            return (
              <div className='p-4 bg-white shadow-2xl hover:shadow-xl shadow-pink-200 min-h-76 max-h-fit mt-4 m-2 w-3/4 md:w-1/5 rounded '>
                <img
                  src={res.profile_picture || male}
                  className='shadow-lg rounded-full'></img>
                <p className='text-xl text-center mt-2 font-semibold'>
                  {res.name}
                </p>
                <p className='text-center'>{res.email}</p>
                {/* Add friend button */}
                {/* if already friend show already friend */}


                {res.user_id != localStorage.getItem("userID") ? (
                  <p
                    onClick={() => AddFriend(res.user_id)}
                    className='bg-blue-800 p-2 text-center cursor-pointer hover:bg-blue-600 text-white px-4 rounded'>
                    Add Friend
                  </p>
                ) : (
                  <p className='bg-blue-800  p-2 text-center cursor-pointer hover:bg-blue-600 text-white px-4 rounded'>
                    YOU
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Allusers;
