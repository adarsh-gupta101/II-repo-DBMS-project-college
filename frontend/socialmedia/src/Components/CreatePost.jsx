import React from "react";
import { useState } from "react";
// import { Form, Input } from "antd";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");

  console.log(localStorage.getItem("userID"))

  const handlePost = (event) => {
    // Send the post content to the backend
    // for storage in the database, etc.
    event.preventDefault();
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    toast.success("Post created successfully!")

    axios
      .post("https://socialmedia-backend-glx4.onrender.com/createpost", {
        user_id: localStorage.getItem("userID"),
        post_text: postContent,
        post_time: yyyy.toString() + "/" + mm + "/" + dd.toString(),
        post_image: "https://picsum.photos/200/300",
      })
      .then((res) => {
        console.log(res);
      }).then((() =>{
        setPostContent("")
        // window.location.reload();

      }))
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  return (
    <form className='flex p-4 md:w-1/2 m-2 md:m-auto md:mt-12'>
      <ToastContainer/>
      <div className='w-full'>
        {/* input text area */}

        <textarea
          type='textArea'
          //   8 lines
          rows='8'
          placeholder="What's happening?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
        <div className='mt-2'>
          <button
            onClick={(e)=>handlePost(e)}
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Post Now!
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
