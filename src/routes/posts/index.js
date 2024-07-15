const { Router } = require('express');
const Posts = require('../../models/posts.model');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');

const postsRouter = Router();

postsRouter.get('/', async(req, res) => {
    const categories = await categoryService.sideMenuList();
    const firstPost = await postsService.firstPost();
    res.render('index', {
        categories: categories,
        firstPost: firstPost
    });
})

postsRouter.get('/test', async(req, res) => {
    const categories = await categoryService.sideMenuList();
    const firstPost = await postsService.firstPost();
    res.render('test', {
        categories: categories,
        firstPost: firstPost
    });
})

postsRouter.get('/:id', async(req, res) => {
    const id = req.params.id;
    const categories = await categoryService.sideMenuList();
    const post = await postsService.selectPost(id);
    res.render('detail', {
        categories: categories,
        post: post
    });
})

postsRouter.post('/add', async(req, res) => {
    const {title, content, subId} = req.body;

    Posts.create({
        title: title,
        content: content,
        subId: subId
    })
    .then(() => {
        res.json({
            title: title,
            content: content,
            message: '게시글 업로드 완료'
        }).status(200)
    }).catch((err) => {
        console.log('[API] Posts (add) 에러 : ', err);
        res.status(400);
    })
})

postsRouter.get('/:id', async(req, res) => {
    const postId = req.params.id;

    Posts.findOne({
        where: {
            id: postId,
        }
    })
    .then((result) => {
        res.json(result).status(200);
    }).catch((err) => {
        console.log('[API] Posts (id) 에러 : ', err);
        res.status(400);
    })
})



module.exports = postsRouter;