const MainCategory = require("../models/main-category.model");
const Posts = require("../models/posts.model");
const SubCategory = require("../models/sub-category.model");

const postsService = {
    firstPost: async () => {
        try {
            const result = await Posts.findOne({
                order: [['id', 'DESC']]
            })
            return result;
        } catch (err) {
            throw err;
        }
    },

    selectPost: async(postId) => {
        try {
            const result = await Posts.findOne({
                where: {id: postId}
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    createPost: async (title, content, mainId, subId) => {
        await Posts.create({
            title: title,
            content: content,
            subId: subId
        });
    }
};

module.exports = postsService;
