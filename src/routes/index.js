const {Router} = require('express');
const postsRouter = require('./posts');
const Posts = require('../models/posts.model');
const SubCategory = require('../models/sub-category.model');
const adminRouter = require('./admin');
const { getImage } = require('../config/image');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.SECRET_KEY;
const api = Router()

api.use('/posts', postsRouter);
api.use('/admin', adminRouter);

api.get('/', (req, res) => {
    res.redirect('/posts');
})

api.get('/image/:filename', async (req, res) => {
    const image = await getImage(req.params.filename);

    res.setHeader('Content-Type', 'image/png');
    res.send(image);
});

api.post('/api/password/confirm', (req, res) => {
    const { password } = req.body;

    if (password === '1234') {
        const token = jwt.sign({ user: 'Admin' }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('비밀번호가 틀렸습니다.');
    }
})

api.get('/api/admin',authenticateJwt, (req, res) => {
    res.json({ message: 'Admin' })
})

function authenticateJwt(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}


module.exports = api;