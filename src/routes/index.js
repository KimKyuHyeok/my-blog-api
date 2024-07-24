const {Router} = require('express');
const postsRouter = require('./posts');
const Posts = require('../models/posts.model');
const SubCategory = require('../models/sub-category.model');
const adminRouter = require('./admin/index');
const { getImage } = require('../config/image');
const jwt = require('jsonwebtoken');
const authenticateJwt = require('./middleware/auth');
require('dotenv').config()

const secretKey = process.env.SECRET_KEY;
const api = Router()

api.use('/api/post', postsRouter);
api.use('/api/admin', adminRouter);


api.get('/image/:filename', async (req, res) => {
    const image = await getImage(req.params.filename);

    res.setHeader('Content-Type', 'image/png');
    res.send(image);
});

api.post('/api/password/confirm', (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ user: 'Admin' }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('비밀번호가 틀렸습니다.');
    }
})

api.get('/api/admin',authenticateJwt, (req, res) => {
    res.json({ message: 'Admin' })
})




module.exports = api;