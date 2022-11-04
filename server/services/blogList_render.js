const axios = require('axios');




exports.blog_list = (req,res)=>{
    axios.get('http://localhost:3000/allblog')
    .then(function(response){
    //console.log(data);
    //res.cookie("test", 'this is cook');
        res.render('blog_list', {allblog:response.data});
        console.log(response);
    })
    .catch(err =>{
        res.send(err);
    })
}


exports.blog_view = (req, res)=>{
    axios.get('http://localhost:3000/allblog',{params:{id:req.query.id}})
    .then(function(blogdata){
        res.render("blog_view", {blog:blogdata.data})
        console.log(blogdata.data);
    })
    .catch(err=>{
        res.send(err);
    })

}

exports.blog_edit = (req, res)=>{
    axios.get('http://localhost:3000/blogcategory')
    .then(function(categorydata){
        var mathcategory = JSON.stringify(categorydata.data);
    })

    axios.get('http://localhost:3000/allblog',{params:{id:req.query.id}})
    .then(function(blogdata){
        var category = JSON.stringify(blogdata.data.category);
    
        //console.log("mathcategory" + mathcategory);

       // console.log("category is " + category);
        res.render("blog_edit", {blog:blogdata.data})
    })
    .catch(err=>{
        res.send(err);
    })

}