const { Sequelize } = require("sequelize");
const { dbPool, db } = require("../config/database");

const { DataTypes } = Sequelize;

const blogModel = db.define(
    "blogs",
    {
        title: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

const queryGetAllBlogs = async () => {
    const SQLQuery = `
    SELECT blogs.id, blogs.title, blogs.content, users.id AS author_id, users.name AS author_name, users.email AS author_email, users.headline AS author_headline
    FROM blogs
    JOIN users ON blogs.author = users.id`;
    return dbPool.execute(SQLQuery);
};

module.exports = { blogModel, queryGetAllBlogs };
