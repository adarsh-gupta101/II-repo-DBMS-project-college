import axios from "axios";
import React, { useEffect, useState } from "react";

function Friends() {
  useEffect(() => {
    fetchFriends(localStorage.getItem("userID"));
  }, []);
  const [friends, setFriends] = useState([]);

  function fetchFriends(u) {
    axios
      .get(`https://socialmedia-backend-glx4.onrender.com/friends?user_id=${u}`,{user_id:u})
      .then((response) => {
        setFriends(response.data.data);
        console.log(response.data); // array of friend_id values
      })
      .catch((error) => {
        console.error(error.response.data.error); // error message
      });
  }

  return (
    <div className="bg-gray-900 ">
      <div className="flex justify-evenly items-center ">

    <h1 className="text-4xl font-bold text-white ">Friends</h1>
    <a href="/"> <p className="bg-gray-100 p-4 m-2 text-black rounded shadow-2xl shadow-blue-300 font-bold "> Back to Home</p> </a>

      </div>
  
    
    <div className='flex-col flex md:flex-row flex-wrap  items-center justify-center bg-gray-900 min-h-screen'>/
      {friends?.map((friend) => {
        if (friend.user_id != localStorage.getItem("userID")) {
          return (
            <div className=' bg-white p-2 h-fit  m-8 flex-col items-center justify-center rounded m-auto md:w-1/5 h-fit border-2 border-blue-200 hover:border-pink-500 shadow-2xl shadow-blue-400'>
              {/* <p>{friend}</p> */}
              <p className="text-2xl first-letter:text-3xl text-center">{friend.name}</p>
              <p className="text-gray-800 text-center">{friend.name}</p>
              <img className="m-auto rounded-full" src={friend.profile_picture}></img>
            <p className="text-center bg-red-400 m-2 text-white font-bold">UnFriend</p>
            </div>
          );
        }


        // return (
        //   <div className=' bg-white p-2 h-fit  m-8 flex-col items-center justify-center rounded m-auto w-1/5 h-fit border-2 border-blue-200 hover:border-pink-500 shadow-2xl shadow-blue-400'>
        //     {/* <p>{friend}</p> */}
        //     <p className="text-2xl first-letter:text-3xl text-center">{friend.name}</p>
        //     <p className="text-gray-800 text-center">{friend.name}</p>
        //     <img className="m-auto rounded-full" src={friend.profile_picture}></img>
        //   </div>
        // );
      })}
    </div>
    </div>
  );
}

export default Friends;
