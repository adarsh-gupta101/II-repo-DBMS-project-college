import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCont from "./Comment";
import RouteComponents from "./RouteComponents";
const userID = localStorage.getItem("userID");

function Posts() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState();
  const handleComment = (post_id) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // Format the date and time as a string in the desired format
    const formattedDateTime = `${yyyy}-${mm.toString().padStart(2, "0")}-${dd
      .toString()
      .padStart(2, "0")} ${hh.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

    axios
      .post(`https://socialmedia-backend-glx4.onrender.com/comment`, {
        user_id: userID,
        post_id: post_id,
        comment_text: comment,
        comment_time: formattedDateTime,
      })
      .then((res) => {
        // console.log(res);
      });
  };

  //   const user=[{user_id:1,name:"joe"},{user_id:2,name:"joe2"}}]
  // an object user with key asţid ,name as name
  const user = [];
  const postLikeCount = [];

  const finduser = (user_id) => {
    const data = axios
      .get(`https://socialmedia-backend-glx4.onrender.com/userdetails?user_id=${user_id}`)
      .then((res) => {
        // if not same user id push
        // console.log(res.data[0].name);
if(user.length===0){
         user.push({ user_id: user_id, name: res.data[0].name });

        console.log(user);
}
      });
  };

  const Like = (id) => {
    const liked = axios
      .post(`https://socialmedia-backend-glx4.onrender.com/likes`
      , {user_id: userID, post_id: id })
      .then((res) => {});
  };

  //   const find

  useEffect(() => {
    axios.get(`https://socialmedia-backend-glx4.onrender.com/posts`, {}).then((res) => {
      setPosts(res.data);
      // console.log(res.data)

      // console.log(posts.reverse());


      // console.log(res.data.reverse());
    }, [postLikeCount]);

    // posts.map((post) => {
    //   finduser(post.user_id);
    // });
    // post like count
  }, [posts]);

  return (
    <div className='bg-gray-900'>
       <a href='/'>
      {window.location.pathname =="/allposts"?  <p className='bg-white text-black font-bold p-2 mt-4 mx-4 rounded shadow-sm w-fit'>
          Back to Home
        </p>:null}
      </a>
      <p className="text-white text-center text-4xl font-bold m-4 ">Posts</p>
      
      {/* <RouteComponents/> */}
      {posts &&
        posts.reverse().map((post,key) => {
          return (
            <div key={key} className='bg-white shadow-lg shadow-purple-400 rounded-lg p-4 my-4 w-5/6 md:w-1/2 m-auto'>
              <div className='flex'>
                <img
                  src={post.user[0].profile_picture}
                  className='rounded-full w-24 h-24 object-contain mr-4'
                />
                <div className='flex flex-col'>
                  {" "}
                  <p className='text-gray-900 text-lg font-semibold'>
                    {post.user[0].name}
                  </p>
                  <p className='text-gray-500 text-sm'>@{post.user[0].name} </p>
                </div>
              </div>
              <h2 className='font-semibold text-xl mt-8'>{post.post_text}</h2>
              <section className='flex'>
                {" "}
                <p className='text-gray-500 text-sm pr-2 mt-8'>
                  {post.post_time}
                </p>
              </section>

              <section className='flex mt-4 cursor:pointer'>
                <p className='p-2 text-lg'>
                  <span
                    className='hover:text-2xl cursor-pointer'

                    onClick={() => Like(post.post_id)}>
                    💖
                  </span>
                  {post.likes} Likes
                </p>
                <p className='p-2 text-lg'>
                  <span className='hover:text-2xl'>💭</span>{" "}
                  {post.totalcomments} Comments
                </p>
              </section>
              {/* Comment box */}
              <CommentCont postid={post.post_id} />
            </div>
          );
        })}
    </div>
  );
}

export default Posts;
