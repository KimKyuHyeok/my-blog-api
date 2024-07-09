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
    },

    editPost: async (title, content, postId) => {
        const post = await Posts.findByPk(postId);

        if (post) {
            post.title = title;
            post.content = content;
            await post.save();
        } else {
            console.log("Post 가 없습니다.");
        }
    }
};

module.exports = postsService;
