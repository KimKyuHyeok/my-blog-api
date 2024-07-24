const { Router } = require('express');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');

const postsRouter = Router();

postsRouter.get('/categories', async(req, res) => {
    try {
        const response = await categoryService.getCategoryList();
        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/menuList Error : ', err);
        res.status(400);
    }
})

postsRouter.get('/:postId', async(req, res) => {

    try {
        const postId = req.params.postId;
        const response = await postsService.selectPost(postId);
    
        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/:postId Error : ', err);
        res.status(400);
    }
})

postsRouter.get('/', async(req, res) => {
    try {
        const firstPost = await postsService.firstPost();
        res.json(firstPost).status(200);
    } catch (err) {
        console.log('[API] /api/post Error : ', err);
        res.status(400);
    }
})

module.exports = postsRouter;