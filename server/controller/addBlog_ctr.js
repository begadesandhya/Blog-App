var Blog = require('../model/addBlog_model.js');
var BlogCategory = require('../model/blog_category_model.js');
const multer = require('multer');

require('../database/connection');

exports.create = (req, res) => {
    const { blogLanguage, author, category, title, description, content, slug, timeDurationToRead, isFeatured, blogStatus} = req.body;
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }
         
        const blog = new Blog({
             blogLanguage : req.body.blogLanguage,
             author : req.body.author,
             category : req.body.category,
             title : req.body.title,
             titleImage : req.file.filename,
             description : req.body.description,
             content : req.body.content,
             slug : req.body.slug,
             timeDurationToRead : req.body.timeDurationToRead,
             isFeatured : req.body.isFeatured,
             blogStatus : req.body.blogStatus,
            });
       
        console.log(category);
        blog.save().then(data => {
        //res.send(data)
        res.redirect('/blog-list');
        //return res.status(201).json({ error: "user register"});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error in createing user"
        });
    });
     
}



exports.find = (req, res) =>{
    BlogCategory.find()
    .then(blogcategory =>{
        res.send(blogcategory)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "error occured"});
    })
}

