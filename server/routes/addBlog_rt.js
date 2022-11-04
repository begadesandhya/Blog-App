const express = require('express');
const route = express.Router();
const services = require('../services/addBlog_render');
const controller = require('../controller/addBlog_ctr');
const authenticate = require('../middleware/authenticate');
 const upload = require('../middleware/upload');

route.get('/add-blog', authenticate, services.add_blog);



route.post('/addBlog', upload, controller.create);
route.get('/allblogcategory',controller.find);

//route.get('/api/users',controller.find);



module.exports = route;
