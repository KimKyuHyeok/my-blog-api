const {Router} = require('express');
const postsRouter = require('./posts');
const Posts = require('../models/posts.model');
const MainCategory = require('../models/main-category.model');
const SubCategory = require('../models/sub-category.model');
const mainCategoryRouter = require('./mainCategory');
const subCategoryRouter = require('./subCategory');


const api = Router()

api.use('/posts', postsRouter);
api.use('/mainCategory', mainCategoryRouter);
api.use('/subCategory', subCategoryRouter);


module.exports = api;