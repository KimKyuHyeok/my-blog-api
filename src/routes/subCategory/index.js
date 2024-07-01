const { Router } = require('express');
const MainCategory = require('../../models/main-category.model');
const SubCategory = require('../../models/sub-category.model');

const subCategoryRouter = Router();

subCategoryRouter.post('/add', async(req, res) => {
    try {
        const title = req.body.title;
        const mainId = req.body.mainId;
    
        await SubCategory.create({
            title: title,
            mainId: mainId
        });

        res.json({ message: "[API] Sub Category (add) Success"})

    } catch (err) {
        console.log('[API] Sub Category (add) 에러 : ', err);
        res.status(400);
    }
})

module.exports = subCategoryRouter;