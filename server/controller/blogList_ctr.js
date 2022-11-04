var Allblog = require('../model/addBlog_model.js');
var Allcategory = require('../model/blog_category_model.js');
var mongoose = require('mongoose');
require('../database/connection');


exports.find = (req, res) =>{
    if(req.query.id){
        const id = req.query.id;
        console.log("thi si id" + id);
        Allblog.findById(id)
        .populate('category')
        .exec()
        .then(data =>{
            if(!data){
                res.status(404).send({message:"not found"+id})
            }else{
                res.send(data)
                console.log(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"error in retrivng"})
        })
    }else{
        Allblog.find()
        .populate('category')
        .exec()
        .then(data =>{
            if(!data){
                res.status(404).send({message:"not found"})
            }else{
                res.send(JSON.stringify(data));
                //console.log(JSON.stringify(data));
            }
        })
        .catch(err =>{
            res.status(500).send({message: err.message || "error occured"});
        })
    }


    
}

exports.update=(req, res)=>{
    const id = req.params.id;

    console.log("in update");
    if(!req.body){
        return res
        .status(400)
        .send({message:"field can not be empty"})
    }
    if(!req.file){
        console.log("req body");

    console.log(req.body);
    Allblog.findByIdAndUpdate(id, {$set:req.body})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"cannot update user"});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message:"error update user"})
    })
    }else{
    console.log("req file");
    console.log(req.file);
    console.log("req body");

    console.log(req.body);
    Allblog.findByIdAndUpdate(id, {$set:req.body, "titleImage":req.file.filename})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"cannot update user"});
        }else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message:"error update user"})
    })
}
}


exports.delete=(req, res) =>{
    const id = req.params.id;
    Allblog.findByIdAndDelete(id)
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


exports.detailblog=(req, res)=>{
    const category = req.query.category;
    Allblog.aggregate([{$match:{"category": mongoose.Types.ObjectId(category)}},
    {
        $lookup:{
            from:"blogcategories",
            localField:"category",
            foreignField:"_id",
            as:"blogdetail"
    }
    }

    ]).exec((err, res)=>{
        if(err) throw err;
        console.log(JSON.stringify(res));
    })
    //console.log(blogdetail);
}


exports.blogwithcategory=(req, res)=>{
    const id = req.query.id;
        console.log("thi si id" + id);
        Allblog.findById(id)
        .populate('category')
        .exec()
        .then(data =>{
            if(!data){
                res.status(404).send({message:"not found"+id})
            }else{
                res.send(data)
                console.log(data.category.categoryName)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"error in retrivng"})
        })
        
}