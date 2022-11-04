const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/database/connection')


const app = express()

dotenv.config({path:'config.env'}); 
const PORT = process.env.PORT||8080 

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());

app.set('view engine','ejs');
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public/assets')));
app.use(express.static(path.join(__dirname, '/public/plugins')));
app.use(express.static(path.join(__dirname, '/public/uploads')));

app.use('/', require('./server/routes/admin_rt.js'));
app.use('/', require('./server/routes/blog_category_rt.js'));
app.use('/', require('./server/routes/addBlog_rt.js'));
app.use('/', require('./server/routes/blogList_rt.js'));





app.listen(PORT,()=>{console.log(`server is running ${PORT}`)});
