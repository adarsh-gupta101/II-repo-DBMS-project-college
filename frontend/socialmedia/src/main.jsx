import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CreatePost from "./Components/CreatePost";
import Allusers from "./Components/Allusers";
import Allposts from "./Components/Allposts";
import Posts from "./Components/Posts";
import Friends from "./Components/friends";
let userID = localStorage.getItem("userID");

const router = createBrowserRouter([
  {
    path: "/",
    element: !userID ? <Login /> : <App />,
  },
  {
    path: "/signin",
    element: <Signup />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/post",
    element: <CreatePost></CreatePost>,
  },
  { path: "/allusers", element: <Allusers></Allusers> },
  { path: "/allposts", element: <Posts></Posts> },
  { path: "/allfriends", element: <Friends></Friends> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
