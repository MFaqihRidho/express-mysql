const { where, Model } = require("sequelize");
const blogsModel = require("../models/blogs");
const usersModel = require("../models/users");

const getAllBlog = async (req, res) => {
    try {
        usersModel.hasMany(Post, { foreignKey: "user_id" });
        blogsModel.belongsTo(User, { foreignKey: "user_id" });

        blogsModel.find({ include: [usersModel] });
        const rawData = await blogsModel.findAll();
        res.json({
            message: "Success get Blog",
            data: rawData,
            author: data,
        });
    } catch (error) {
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
