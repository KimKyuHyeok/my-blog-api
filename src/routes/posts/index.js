const { Router } = require('express');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');

const postsRouter = Router();

postsRouter.get('/categories', async(req, res) => {
    try {
        const response = await categoryService.getCategoryAndPostList();
        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/menuList Error : ', err);
        res.status(400).send('에러가 발생했습니다 : ', err);
    }
})

postsRouter.get('/:postId', async(req, res) => {

    try {
        const postId = req.params.postId;
        const response = await postsService.findOnePost(postId);
    
        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/:postId Error : ', err);
        res.status(400).send('에러가 발생했습니다 : ', err);
    }
})

postsRouter.get('/:postId/category/posts', async(req, res) => {
    try {
        const postId = req.params.postId;
        const response = await postsService.categoryAndPosts(postId);

        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/:postId/category/posts Error : ', err);
        res.status(400).send('에러가 발생했습니다 : ', err);
    }
})

postsRouter.get('/home/info', async(req, res) => {
    try {
        const response = await postsService.homeCategoryAndPosts();

        res.json(response).status(200);
    } catch (err) {
        console.log('[API] /api/post/home/category/posts Error : ', err);
        res.status(400).send('에러가 발생했습니다 : ', err);
    }
})

postsRouter.get('/', async(req, res) => {
    try {
        const firstPost = await postsService.firstPost();
        console.log(firstPost.content);
        res.json(firstPost).status(200);
    } catch (err) {
        console.log('[API] /api/post Error : ', err);
        res.status(400).send('에러가 발생했습니다 : ', err);
    }
})

module.exports = postsRouter;