const {Router} = require('express');
const postsRouter = require('./posts');
const Posts = require('../models/posts.model');
const MainCategory = require('../models/main-category.model');
const SubCategory = require('../models/sub-category.model');
const adminRouter = require('./admin');


const api = Router()

api.use('/posts', postsRouter);
api.use('/admin', adminRouter);


module.exports = api;