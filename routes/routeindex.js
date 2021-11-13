const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async function(req,res){
  var posts = await Post.find()
  res.render('index',{posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});



module.exports = router;