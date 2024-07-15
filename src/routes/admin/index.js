const { Router } = require('express');
const Posts = require('../../models/posts.model');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');
const isAuth = require('../middleware/auth');
const { upload, s3 } = require('../../config/image');
const { Upload } = require('@aws-sdk/lib-storage');
const { randomUUID } = require('crypto');
const path = require('path');

const adminRouter = Router();

adminRouter.post('/password', async(req, res, next) => {
    const password = req.body.password;
    const confirm = process.env.ADMIN_PASSWORD;

    if (password === confirm) {
        req.session.authenticated = true;
        res.redirect('/admin');
    } else {
        res.render('admin/alert', {success: '비밀번호가 틀렸습니다.'});
    }
    next();
});

adminRouter.get('/', isAuth, async(req, res) => {
    const categories = await categoryService.sideMenuList();

    res.render('admin/index', {
        categories: categories
    })
})

adminRouter.post('/subCategory/add', isAuth, async(req, res) => {
    const addTitle = req.body.title;
    const mainId = req.body.mainId;
    categoryService.addSubCategory(addTitle, mainId);

    res.render('admin/alert', {success: '업로드가 완료되었습니다.'});
})

adminRouter.post('/subCategory/update', isAuth, async(req, res) => {
    const updateTitle = req.body.title;
    const subId = req.body.subId;
    categoryService.updateSubCategory(updateTitle, subId);

    res.render('admin/alert', {success: '수정이 완료되었습니다.'});
})

adminRouter.post('/subCategory/delete', isAuth, async(req, res) => {
    const subId = req.body.subId;
    categoryService.deleteSubCategory(subId);

    res.render('admin/alert', {success: '삭제가 완료되었습니다.'});
})

adminRouter.get('/write', isAuth, async (req, res) => {
    const subCategoryList = await categoryService.subCategoryList();

    res.render('admin/write', {
        subCategoryList: subCategoryList
    });
})

adminRouter.get('/select/subCategory', isAuth, async(req, res) => {
    const mainId = req.query.mainId;
    const result = await categoryService.selectSubCategoryList(mainId);
    res.json(result);
})

adminRouter.post('/post/add', isAuth, async(req, res) => {
    const { title, content, mainId, subId } = req.body;
    console.log("TEST > ", req.body);

    try {
        await postsService.createPost(title, content, mainId, subId);

        res.render('admin/alert', {success: '게시물 업로드가 완료되었습니다.'});
    } catch(err) {
        console.log('게시물 업로드 에러 : ', err);
        res.render('admin/alert', {success: '게시물 업로드 도중 에러가 발생했습니다.'});
    }
})


adminRouter.get('/:id/edit', isAuth, async(req, res) => {
    const postId = req.params.id;
    const post = await postsService.selectPost(postId);

    const subCategoryId = post.subId;
    const subCategoryInfo = await categoryService.getSubCategoryIdAndTitle(subCategoryId);

    res.render('admin/edit', {
        postId: post.id,
        title: post.title,
        content: post.content,
        subCategoryInfo: subCategoryInfo,
    });
})

adminRouter.post('/:id/edit', isAuth, async(req, res) => {
    try {
        const postId = req.params.id;
        console.log("TEST > ", req.body);
        const { title, content } = req.body;

        await postsService.editPost(title, content, postId);

        res.render('admin/alert', {success: '수정이 완료되었습니다.'});
    } catch (err) {
        console.log("게시물 수정도중 에러 발생 : ", err);
    }
})


adminRouter.post('/image-upload', upload.single('upload') ,async(req, res) => {
    try {
        const imageFile = req.file;
    
        console.log('1');
        const orgFilename = imageFile.originalname;
        const uuid = randomUUID().replace(/-/g, '');
        const extension = path.extname(orgFilename);
        const saveFilename = uuid + extension;
    
        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: saveFilename,
            Body: imageFile.buffer,
            ContentType: imageFile.mimetype,
        };
    
        console.log('2');
        const paralleUploadS3 = new Upload({
            client: s3,
            params: uploadParams
        });
    
        const data = await paralleUploadS3.done();
    
        console.log('3');
        res.send({
            message: '업로드 성공',
            filename: data.Key,
            location: data.Location,
        });
    } catch (err) {
        console.error("Image Upload Error : ", err);
        res.status(500).send('업로드 에러')
    }
})

adminRouter.get('/posts', isAuth, async(req, res) => {
    const list = await postsService.getPosts();
    const categories = await categoryService.sideMenuList();

    res.render('admin/posts-admin', {
        categories: categories,
        subCategoryList: list
    });
})

adminRouter.get('/:id/post/delete', isAuth, async(req, res) => {
    const id = req.params.id;

    try {
        await postsService.deletePost(id);

        res.render('admin/alert', {success: '게시물이 삭제되었습니다.'});
    } catch (err) {
        console.log(err);
    }
})


module.exports = adminRouter;