const { where, Model } = require("sequelize");
const { blogsModel, queryGetAllBlogs } = require("../models/blogs");
const usersModel = require("../models/users");

const getAllBlog = async (req, res) => {
    try {
        const [rawData] = await queryGetAllBlogs();
        const mappedData = rawData.map((blog) => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            author: {
                email: blog.author_email,
                name: blog.author_name,
                headline: blog.author_headline,
            },
        }));
        res.json({
            message: "Success get Blog",
            data: mappedData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};

const createBlog = async (req, res) => {
    const { title, category, images, content } = req.body;

    try {
        await blogsModel.create({
            title,
            author: req.idUser,
            category,
            images,
            content,
        });
        res.status(201).json({
            message: "Succes create blog",
            data: {
                title,
                category,
                images,
                content,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};

module.exports = {
    getAllBlog,
    createBlog,
};
