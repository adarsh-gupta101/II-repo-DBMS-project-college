const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

// Create the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to Supabase
const supabase = createClient(process.env.URL, process.env.API);
// console.log(supabase.)

app.post("/addfriend", async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const { data, error } = await supabase
      .from("friends")
      .insert([{ user_id: user_id, friend_id: friend_id }]);
    res.send(error);
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

app.get("/allusers", async (req, res) => {
  let { data: users, error } = await supabase.from("users").select("*");

  res.send(users);
});

app.get("/friends", async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const { data, error } = await supabase
      .from("friends")
      .select("friend_id")
      .eq("user_id", user_id);

    console.log(data);

    // get friends for loop

    const friends = await supabase
      .from("users")
      .select("*")
      .in(
        "user_id",
        data.map((f) => f.friend_id)
      );
    // console.log(friends)

    // data[0].friends=friends.data
    //   'SELECT friend_id FROM friends WHERE user_id = $1',
    //   [user_id]
    // );
    // find these users
    // const friends = [];
    // for (let i = 0; i < data.length; i++) {
    //   const { data: user } = await supabase.from("users").select("*").eq("id", rows[i].friend_id);

    //   friends.push(user[0]);
    // }
    res.send(friends);
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);
    if (users.length > 0) {
      res.send(users[0]);
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/userdetails", async (req, res) => {
  //   const { data: rows } = await supabase.query(
  //     "SELECT * FROM users WHERE user_id = $1",
  //     [req.query.user_id]
  //   );
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", req.query.user_id);
  if (error) {
    res.send({ error: error.message });
  } else {
    res.send(data);
  }
});

app.get("/postcomments", async (req, res) => {
  // get comments by post id
  const post_id = req.query.post_id;
  //   const { data: comments } = await supabase.query(
  //     "SELECT * FROM comments WHERE post_id = $1",
  //     [post_id]
  //   );
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", post_id);
  // send comments users

  for (let i = 0; i < data?.length; i++) {
    const user = await supabase
      .from("users")
      .select("*")
      .eq("user_id", data[i].user_id);
    // console.log(user)
    data[i].user = user?.data[0];
  }
  res.send(data);
});

app.get("/posts", async (req, res) => {
  try {
    // const { data: rows } = await supabase.query(
    //   "SELECT post_id, user_id, post_text, post_time FROM posts WHERE user_id = $1",
    //   [user_id]
    // );
    const { data } = await supabase.from("posts").select("*");
    // console.log(data)

    // find the posted user
    for (let i = 0; i < data?.length; i++) {
      const user = await supabase
        .from("users")
        .select("*")
        .eq("user_id", data[i].user_id);
      // console.log(user.data)
      data[i].user = user.data;
    }
    // get likes
    for (let i = 0; i < data?.length; i++) {
      const likes = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", data[i].post_id);
      data[i].likes = likes?.data.length;
      // console.log(likes.data.length)
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post("/createpost", async (req, res) => {
  const { user_id, post_text, post_time } = req.body;

  try {
    // const { data: rows } = await supabase.query(
    //   "INSERT INTO posts (user_id, post_text, post_time) VALUES ($1, $2, $3) RETURNING post_id",
    //   [user_id, post_text, post_time]
    // );

    const { data, error } = await supabase
      .from("posts")
      .insert([
        { user_id: user_id, post_text: post_text, post_time: post_time },
      ]);
    if (error) {
      res.send({ error: error.message });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/comment", async (req, res) => {
  const { user_id, post_id, comment_text, comment_time } = req.body;

  try {
    // const { data: rows } = await supabase.query(
    //   "INSERT INTO comments(user_id, post_id, comment_text, comment_time) VALUES ($1, $2, $3, $4) RETURNING comment_id",
    //   [user_id, post_id, comment_text, comment_time]
    // );

    const { data: rows } = await supabase.from("comments").insert([
      {
        user_id: user_id,
        post_id: post_id,
        comment_text: comment_text,
        comment_time: comment_time,
      },
    ]);
    res.send(rows);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/createcomment", async (req, res) => {
  const { user_id, post_id, comment_text, comment_time } = req.body;

  try {
    // const { data: rows } = await supabase.query(
    //   "INSERT INTO comments(user_id, post_id, comment_text, comment_time) VALUES ($1, $2, $3, $4) RETURNING comment_id",
    //   [user_id, post_id, comment_text, comment_time]
    // );

    const { data: rows } = await supabase
      .from("comments")
      .insert([
        {
          user_id: user_id,
          post_id: post_id,
          comment_text: comment_text,
          comment_time: comment_time,
        },
      ])
      .returning("*");

    res.send({ commentId: rows[0].comment_id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/createuser", async (req, res) => {
  const { name, password, picture, email } = req.body;

  try {
    // const { data: rows } = await supabase.query(
    //   "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING user_id",
    //   [user_name, password]
    // );

    const { data, error } = await supabase.from("users").insert([
      {
        name: name,
        password: password,
        profile_picture: picture,
        email: email,
      },
    ]);

    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/likes", async (req, res) => {
  const { user_id, post_id } = req.body;
  const data = req.body;
  // console.log("data", data);

  try {
    // if(liked) then unlike
    // else like

    const isAlradyLiked = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", post_id);

   console.log(isAlradyLiked);

    if (isAlradyLiked?.data.length > 0) {
      const { data: rows } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", user_id);
      res.send("deleted");
      return;
    } else {
      const { data: rows } = await supabase
        .from("likes")
        .insert([{ user_id: user_id, post_id: post_id }]);
    }

    res.send("done");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server listening on port 3000!")
);
