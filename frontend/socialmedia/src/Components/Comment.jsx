import axios from "axios";
import React, { useEffect, useState } from "react";
const userID = localStorage.getItem("userID");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CommentCont({ postid }) {
  const [comment, setComment] = useState();
  const [postcomments, setPostContent] = useState();
  const [CommentResp, setCommentResp] = useState();

  let post_id = postid;
  //   alert(post_id)

  useEffect(() => {
    // get comments by post id
    axios
      .get(
        `https://socialmedia-backend-glx4.onrender.com/postcomments?post_id=${post_id}`
      )
      .then((res) => {
        setPostContent(res.data);
        console.log(postcomments);
        // console.log(postcomments)
      });
  }, [CommentResp]);
 
  const handleComment = (post_id) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    axios
      .post(`https://socialmedia-backend-glx4.onrender.com/comment`, {
        user_id: userID,
        post_id: post_id,
        comment_text: comment,
        comment_time: yyyy.toString() + "/" + mm + "/" + dd.toString(),
      })
      .then((res) => {
        setCommentResp(res.data);
        toast.success("Commented Successfully");
        console.log(res);
        // window.location.reload();
      });
  };

  return (
    <div>
      <section className='flex mt-4 w-11/12 m-auto'>
        <ToastContainer />

        <input
          type='text'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className='w-3/4 rounded-full border-2 border-gray-300 p-2'
          placeholder='Write a comment...'
        />
        <button
          onClick={() => handleComment(post_id)}
          className='bg-blue-800 text-white px-8 rounded mx-2 rounded-full '>
          {" "}
          Send
        </button>
      </section>

      <section className='flex flex-wrap justify-center max-h-72 overflow-scroll '>
        {/* show 3 comments */}
        {postcomments &&
          postcomments.map((comment, index) => {
            return (
              <div className='shadow my-2  ' key={index}>
                <div className='flex justify-start'>
                  <img
                    src={comment.user.profile_picture}
                    className='w-1/12 rounded-full object-cover'
                  />
                  <p className='text-center font-bold'>{comment.user.name}</p>
                </div>
                <p className='text-center mt-2 w-fit   p-2 pr-8 '>
                  {comment.comment_text}
                </p>
              </div>
            );
          })}
        {/* <p className="text-center bg-blue-300 w-fit m-auto p-3">Show more</p> */}
      </section>
    </div>
  );
}

export default CommentCont;
