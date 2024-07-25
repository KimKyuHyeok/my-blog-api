const { UUID } = require("sequelize");
const Posts = require("../models/posts.model");
const SubCategory = require("../models/sub-category.model");
const { randomUUID } = require("crypto");
const path = require("path");

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

    findOnePost: async(postId) => {
        try {
            const result = await Posts.findOne({
                where: {id: postId}
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    //ref
    createPost: async (title, content, categoryId) => {
        await Posts.create({
            title: title,
            content: content,
            subId: categoryId
        });
    },

    //ref
    editPost: async (title, content, postId) => {
        const post = await Posts.findByPk(postId);

        if (post) {
            post.title = title;
            post.content = content;
            await post.save();
        } else {
            console.log("Post 가 없습니다.");
        }
    },

    getPosts: async () => {

        try {
            const list = await SubCategory.findAll({
                include: [{
                    model: Posts
                }],
                order: [['id', 'DESC']]
            });

            return list;
        } catch (err) {
            console.error("Get Post List Error : ", err);
        }
    },

    // ref
    deletePost: async (id) => {
        try {
            await Posts.destroy({
                where: { id: id }
            });
        } catch (err) {
            console.error("Post delete Error : ", err);
        }
    },

    getPostList: async () => {
        try {
            const result = await Posts.findAll()

            return result;
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = postsService;
