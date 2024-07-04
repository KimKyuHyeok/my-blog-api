const { Router } = require('express');
const Posts = require('../../models/posts.model');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');
const isAuth = require('../middleware/auth');

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
    const mainCategoryList = await categoryService.mainCategoryList();
    const subCategoryList = await categoryService.subCategoryList();

    res.render('admin/index', {
        mainCategoryList: mainCategoryList,
        subCategoryList: subCategoryList
    })
})

adminRouter.post('/mainCategory/add', isAuth, async(req, res) => {
    const addTitle = req.body.title;
    categoryService.addMainCategory(addTitle);

    res.render('admin/alert', {success: '업로드가 완료되었습니다.'});
})

adminRouter.post('/mainCategory/update', isAuth, async(req, res) => {
    const updateTitle = req.body.title;
    const mainId = req.body.mainId;
    categoryService.updateMainCategory(updateTitle, mainId);

    res.render('admin/alert', {success: '수정이 완료되었습니다.'});
})

adminRouter.post('/mainCategory/delete', isAuth, async(req, res) => {
    const mainId = req.body.mainId;

    const select = await categoryService.selectMainCategory(mainId);

    if (select !== 0) {
        res.render('admin/alert', {success: 'SubCategory 먼저 삭제 후 진행해주세요.'});
    } else {
        categoryService.deleteMainCategory(mainId);
    }

    res.render('admin/alert', {success: '삭제가 완료되었습니다.'});
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
    const mainCategoryList = await categoryService.mainCategoryList();

    res.render('admin/write', {
        mainCategoryList: mainCategoryList
    });
})

adminRouter.get('/select/subCategory', isAuth, async(req, res) => {
    const mainId = req.query.mainId;
    const result = await categoryService.selectSubCategoryList(mainId);
    res.json(result);
})

adminRouter.post('/post/add', isAuth, async(req, res) => {
    const { title, content, mainId, subId } = req.body;

    try {
        await postsService.createPost(title, content, mainId, subId);

        res.render('admin/alert', {success: '게시물 업로드가 완료되었습니다.'});
    } catch(err) {
        console.log('게시물 업로드 에러 : ', err);
        res.render('admin/alert', {success: '게시물 업로드 도중 에러가 발생했습니다.'});
    }


})

module.exports = adminRouter;