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
    },

    postUpdate: async (postId, content, title, subId) => {
        try {
            const result = await Posts.update(
                {
                    title: title,
                    content: content,
                    subId: subId,
                },
                {
                    where: { id: postId }
                }
            );

        } catch (err) {
            console.error(err);
        }
    },

    categoryAndPosts: async (postId) => {
        try {
            const findPost = await Posts.findByPk(postId);
            const category = await SubCategory.findByPk(findPost.subId);

            const posts = await Posts.findAll({
                where: {
                    subId: category.id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 5
            })

            const result = {
                category,
                posts
            }

            return result;
        } catch (err) {
            console.error(err)
        }
    },

    homeCategoryAndPosts: async () => {
        try {
            const result = await Posts.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 5
            })

            return result;
        } catch (err) {
            console.error(err)
        }
    }
};

module.exports = postsService;
