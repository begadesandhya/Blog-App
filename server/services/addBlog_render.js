const axios = require('axios');


exports.add_blog = (req,res)=>{
    axios.get('http://localhost:3000/allblogcategory')
    .then(function(response){
    console.log(response);
        res.render('add_blog', {allblogcategory:response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}





