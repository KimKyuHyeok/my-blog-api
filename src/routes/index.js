const {Router} = require('express');
const postsRouter = require('./posts');
const Posts = require('../models/posts.model');
const SubCategory = require('../models/sub-category.model');
const adminRouter = require('./admin');
const { getImage } = require('../config/image');


const api = Router()

api.use('/posts', postsRouter);
api.use('/admin', adminRouter);

api.get('/image/:filename', async (req, res) => {
    const image = await getImage(req.params.filename);

    res.setHeader('Content-Type', 'image/png');
    res.send(image);
});


module.exports = api;