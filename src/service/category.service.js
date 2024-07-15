const Posts = require("../models/posts.model");
const SubCategory = require("../models/sub-category.model");

const categoryService = {
    sideMenuList: async () => {
        try {
            const result = await SubCategory.findAll({
                include: [{
                    model: Posts
                }],
                order: [['id', 'DESC']],
            });

            return result;
        } catch (err) {
            console.log('[CategoryService] sideMenuList Error : ', err)
            throw err;
        }
    },

    selectSubCategoryList: async(mainId) => {
        const subCategoryList = await SubCategory.findAll({
            where: { mainId: mainId }
        });

        return subCategoryList;
    },

    subCategoryList: async() => {
        try {
            const result = await SubCategory.findAll();
            return result;
        } catch (err) {
            console.log('[CategoryService] subCategoryList Error : ', err)
            throw err;
        }
    },

    addSubCategory: async(title, mainId) => {
        await SubCategory.create({
            title: title,
            mainId: mainId
        });
    },

    updateSubCategory: async(title, subId) => {
        await SubCategory.update(
            {
                title: title
            },
            {
                where: {
                    id: subId
                }
            }
        )
    },

    deleteSubCategory: async(subId) => {
        await SubCategory.destroy({
            where: { id: subId }
        })
    },

    getSubCategoryIdAndTitle: async(subId) => {
        const subCategoryInfo = await SubCategory.findOne({
            where: { id: subId }
        });

        return subCategoryInfo;
    },
};

module.exports = categoryService;
