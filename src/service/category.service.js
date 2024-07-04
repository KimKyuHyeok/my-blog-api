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
            console.log('[CategoryService] sideMenuList Error : ', err)
            throw err;
        }
    },

    mainCategoryList: async() => {
        try {
            const mainCategoryList = await MainCategory.findAll();

            return mainCategoryList;
        } catch (err) {
            console.log('[CategoryService] mainCategoryList Error : ', err)
            throw err;
        }
    },

    selectMainCategory: async(mainId) => {
        const subCategories = await SubCategory.findAll({
            where: { mainId: mainId }
        });

        return subCategories.length;
    },

    selectSubCategoryList: async(mainId) => {
        const subCategoryList = await SubCategory.findAll({
            where: { mainId: mainId }
        });

        return subCategoryList;
    },

    subCategoryList: async() => {
        try {
            const result = await MainCategory.findAll({
                include: [
                    {
                        model: SubCategory
                    }
                ]
            });
            return result;
        } catch (err) {
            console.log('[CategoryService] subCategoryList Error : ', err)
            throw err;
        }
    },

    addMainCategory: async(title) => {
        await MainCategory.create({
            title: title
        });
    },

    addSubCategory: async(title, mainId) => {
        await SubCategory.create({
            title: title,
            mainId: mainId
        });
    },

    updateMainCategory: async(title, mainId) => {
        await MainCategory.update(
            {
            title: title
            },
            {
                where: {
                    id: mainId
                }
            }
        )
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

    deleteMainCategory: async(mainId) => {
        await MainCategory.destroy({
            where: { id: mainId }
        })
    },

    deleteSubCategory: async(subId) => {
        await SubCategory.destroy({
            where: { id: subId }
        })
    }
};

module.exports = categoryService;
