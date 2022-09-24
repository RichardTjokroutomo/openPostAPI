// IMPORTS
// ===============================================================================
const express = require("express");
const Post = require("./models/postDB");
const User = require("./models/userDB");

const breaker = "=====================================";

// SETUP
// ===============================================================================
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
    console.log(breaker);
});


// ROUTING
// ===============================================================================
app.get("api/index", async (req, resp)=>{
    const allPosts = await Post.find({});
    let latestPost = {};
    for(let post of allPosts){
        latestPost = post;
    };
    const index = latestPost.sNum;
    resp.send({latest: index});
});

app.get("api/loadmore", async (req, resp)=>{
    const {latest_index, posts_loaded} = req.query;
    const startingSnum = latest_index-posts_loaded;

    // get 3 posts
    const postLists = [];
    for(let i = 0; i<3; i++){
      const idx = startingSnum - i;
      //console.log(idx);
      if(idx >= 0){
        const post = await Post.findOne({sNum: idx});
        postLists.push(post);
      }
    }

    // get username from user id
    const usernameList = [];
    for(let post of postLists){
      const username = await User.findOne({userId: post.authorId});
      usernameList.push(username.username);
    }

    reply = {postLists, usernameList};
    resp.send(reply);
});
