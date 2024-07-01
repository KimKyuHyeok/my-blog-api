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
    }
};

module.exports = postsService;
