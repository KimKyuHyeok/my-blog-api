const { Router } = require('express');
const Posts = require('../../models/posts.model');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');
const authenticateJwt = require('../middleware/auth');
const { upload, s3 } = require('../../config/image');
const { Upload } = require('@aws-sdk/lib-storage');
const { randomUUID } = require('crypto');
const path = require('path');

const adminRouter = Router();
// ref


// [API] Category

adminRouter.get('/list/category', authenticateJwt, async(req, res) => {
    try {
        const response = categoryService.getCategoryList();

        res.json(response).status(200).send();
    } catch (err) {
        console.log('[API] /api/admin/list/category Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.post('/add/category', authenticateJwt, async(req, res) => {
    const title = req.body.title;
    
    try {
        await categoryService.addCategory(title);
        res.status(200).send('카테고리 등록 완료');
    } catch (err) {
        console.log('[API] /api/admin/add/category Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.post('/update/category', authenticateJwt, async(req, res) => {
    const { id, title } = req.body;

    try {
        await categoryService.updateCategory(title, id);
        res.status(200).send('카테고리 수정 완료');
    } catch (err) {
        console.log('[API] /api/admin/update/category Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.post('/delete/category', authenticateJwt, async(req, res) => {
    const id = req.body.id;

    try {
        await categoryService.deleteCategory(id);
        res.status(200).send('카테고리 삭제 완료');
    } catch (err) {
        console.log('[API] /api/admin/delete/category Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

// [API] Post

adminRouter.get('/list/post', authenticateJwt, async (req, res) => {
    try {
        const response = await postsService.getPostList();

        res.json(response).status(200).send();
    } catch (err) {
        console.log('[API] /api/admin/list/post Error : ', err);
    }
})

adminRouter.post('/add/post', authenticateJwt, async (req, res) => {
    const { categoryId, title, content } = req.body;

    try {
        await postsService.createPost(title, content, categoryId);

        res.status(200).send('게시글 작성 완료');
    } catch (err) {
        console.log('[API] /api/admin/add/post Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.post('/update/post', authenticateJwt, async (req, res) => {
    const { id, title, content } = req.body;

    try {
        await postsService.editPost(title, content, id);

        res.status(200).send('게시글 수정 완료');
    } catch (err) {
        console.log('[API] /api/admin/update/post Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.post('/delete/post', authenticateJwt, async (req, res) => {
    const id = req.body.id;

    try {
        await postsService.deletePost(id);

        res.status(200).send('게시글 삭제 완료');
    } catch (err) {
        console.log('[API] /api/admin/delete/post Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

adminRouter.get('/:id', authenticateJwt, async (req, res) => {
    const id = req.body.id;

    try {
        const response = await postsService.findOnePost(id);

        res.json(response).status(200).send();
    } catch (err) {
        console.log('[API] /api/admin/:id Error : ', err);
        res.status(400).send('에러가 발생했습니다. : ', err);
    }
})

// ref

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


module.exports = adminRouter;