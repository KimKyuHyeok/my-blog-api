const { Router } = require('express');
const MainCategory = require('../../models/main-category.model');
const SubCategory = require('../../models/sub-category.model');
const Posts = require('../../models/posts.model');

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

mainCategoryRouter.get('/list', async (req, res) => {

    await MainCategory.findAll({
        include: [
            {
                model: SubCategory,
                include: {
                    model: Posts
                }
            }
        ],
        order: [['title', 'DESC']],
    })
        .then(result => {
            res.json(result).status(200);
        })
        .catch(err => {
            console.log('[API] Main Category (list) 에러 : ', err);
            res.status(400);
        })
})

module.exports = mainCategoryRouter;