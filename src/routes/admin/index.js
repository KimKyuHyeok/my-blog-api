const { Router } = require('express');
const Posts = require('../../models/posts.model');
const categoryService = require('../../service/category.service');
const postsService = require('../../service/posts.service');

const adminRouter = Router();

adminRouter.get('/', async(req, res) => {
    const mainCategoryList = await categoryService.mainCategoryList();
    const subCategoryList = await categoryService.subCategoryList();

    res.render('admin/index', {
        mainCategoryList: mainCategoryList,
        subCategoryList: subCategoryList
    })
})

adminRouter.post('/mainCategory/add', async(req, res) => {
    console.log("TEST > ", req.body);
    const addTitle = req.body.title;
    categoryService.addMainCategory(addTitle);

    res.render('admin/alert', {success: '업로드가 완료되었습니다.'});
})

adminRouter.post('/subCategory/add', async(req, res) => {
    const addTitle = req.body.title;
    const mainId = req.body.mainId;
    categoryService.addSubCategory(addTitle, mainId);

    console.log(addTitle, mainId);

    res.render('admin/alert', {success: '업로드가 완료되었습니다.'});
})

module.exports = adminRouter;