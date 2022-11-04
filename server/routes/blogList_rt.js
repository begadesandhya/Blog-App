const express = require('express');
const route = express.Router();
const services = require('../services/blogList_render');
const controller = require('../controller/blogList_ctr');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authenticate');


route.get('/blog-list',authenticate, services.blog_list);
route.get('/blog-view', authenticate, services.blog_view);
route.get('/blog-edit', authenticate, services.blog_edit);


route.get('/allblog', controller.find);
route.patch('/update-blog/:id', upload, controller.update);
route.delete('/delete-blog/:id',controller.delete);
route.get('/detail-blog',controller.detailblog);
route.get('/detail-blogs',controller.blogwithcategory);




//route.get('/api/users',controller.find);



module.exports = route;
