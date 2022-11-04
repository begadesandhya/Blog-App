const express = require('express');
const route = express.Router();
const services = require('../services/admin_render');
const controller = require('../controller/admin_ctr');

route.get('/',services.HomeRoute);

route.post('/log-in',services.log_in);

route.post('/api/users',controller.create);

//route.get('/api/users',controller.find);



module.exports = route;
