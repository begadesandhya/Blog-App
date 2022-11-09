var BlogCategory = require('../model/blog_category_model.js');
require('../database/connection');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }  
        const blogCategory = new BlogCategory({
        categoryName: req.body.categoryName,
        language: req.body.blogLanguage,
        });

        blogCategory.save().then(data => {
        //res.send(data)
        res.redirect('/blog-category');
        console.log('category created');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error in createing category"
        });
    });
    
}

exports.find = (req, res) =>{
    if(req.query.id){
        const id = req.query.id;
        console.log("thi si id" + id);
        BlogCategory.findById(id)
        .then(blogcategory =>{
            res.send(blogcategory)
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "error occured"});
        })
    }else{
    BlogCategory.find()
    .then(blogcategory =>{
        res.send(blogcategory)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "error occured"});
    })
}
}

exports.update=(req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"field can not be empty"})
    }
    const id = req.params.id;
    console.log(req.body);
    BlogCategory.findByIdAndUpdate(id, {$set:req.body})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"cannot update category"});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message:"error update user"})
    })
}


exports.delete=(req, res) =>{
    const id = req.params.id;
    BlogCategory.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"conot delete"});
        }else{
            res.send({
                message:"delete successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({message:"error delete"});
    });
}



