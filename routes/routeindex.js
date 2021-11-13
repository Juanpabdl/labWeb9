const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Post = require('../model/post');

//Regresa los post de la BD
router.get('/', async function(req,res){
  var posts = await Post.find()
  res.render('index',{posts});
});

//Crear un nuevo Post
router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
  var post = new Post(req.body)
  await post.save()
  res.redirect('/')
})

//Editar post
router.get('/edit/:id', async (req,res) =>{
  var id = req.params.id
  var post = await Post.findById(id)
  res.render('edit',{post})
})

router.post('/edit/:id', async (req,res) =>{
  var id = req.params.id
  await Post.updateOne({_id: id}, req.body)
  res.redirect('/');
})

//Eliminar post
router.get('/delete/:id', async (req,res) =>{
  var id = req.params.id
  var post = await Post.findById(id)
  res.render('delete',{post})
})

router.post('/delete/:id',  async (req,res) =>{
  var id = req.params.id
  await Post.remove({_id: id})
  res.redirect('/')
})

module.exports = router;