const { Router } = require('express');
const MainCategoryService = require('./main-category.service');
const MainCategory = require('../../models/main-category.model');

const mainCategoryRouter = Router();

mainCategoryRouter.post('/add', async (req, res) => {
    try {
        const title = req.body.title;
    
        await MainCategory.create({
            title: title
        });

        res.json({ message: "[API] Main Category (add) Success"})

    } catch (err) {
        console.log('[API] Main Category (add) 에러 : ', err);
        res.status(400);
    }
});

module.exports = mainCategoryRouter;