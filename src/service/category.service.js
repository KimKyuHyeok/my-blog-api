const Posts = require("../models/posts.model");
const SubCategory = require("../models/sub-category.model");

const categoryService = {

    //ref
    getCategoryList: async() => {
        try {
            const result = await SubCategory.findAll();
            return result;
        } catch (err) {
            console.log('[CategoryService] subCategoryList Error : ', err)
            throw err;
        }
    },

    //ref
    addCategory: async(title) => {
        await SubCategory.create({
            title: title,
        });
    },


    //ref
    updateCategory: async(title, id) => {
        await SubCategory.update(
            {
                title: title
            },
            {
                where: {
                    id: id
                }
            }
        )
    },

    // ref
    deleteCategory: async(id) => {
        await SubCategory.destroy({
            where: { id: id }
        })
    },

};

module.exports = categoryService;
