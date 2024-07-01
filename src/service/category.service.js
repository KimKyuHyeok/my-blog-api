const MainCategory = require("../models/main-category.model");
const Posts = require("../models/posts.model");
const SubCategory = require("../models/sub-category.model");

const categoryService = {
    sideMenuList: async () => {
        try {
            const result = await MainCategory.findAll({
                include: [
                    {
                        model: SubCategory,
                        include: {
                            model: Posts
                        }
                    }
                ],
                order: [['title', 'DESC']],
            });
            return result;
        } catch (err) {
            console.log('[API] Main Category (list) 에러 : ', err);
            throw err;
        }
    }
};

module.exports = categoryService;
