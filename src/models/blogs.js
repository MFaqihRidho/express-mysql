const { Sequelize } = require("sequelize");
const { db } = require("../config/database");

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

module.exports = blogModel;
