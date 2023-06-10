const { Sequelize } = require("sequelize");
const { dbPool, db } = require("../config/database");
const { formatDate } = require("../helpers");
// const db = require("../config/database");

const { DataTypes } = Sequelize;

const usersModel = db.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        refresh_token: {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
);

const queryGetAllUsers = async () => {
    const SQLQuery = "SELECT id, name, email, headline, createdAt FROM users";
    return dbPool.execute(SQLQuery);
};

const queryGetUserDetailById = async (id) => {
    const SQLQuery = `
     SELECT id, name, email, headline, createdAt FROM users
     WHERE id = ${id}`;
    return dbPool.execute(SQLQuery);
};

const queryGetUserDetailByEmail = async (email) => {
    const SQLQuery = `
     SELECT * FROM users
     WHERE email = '${email}'`;
    return dbPool.execute(SQLQuery);
};

const queryCreateNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (name, email, password, createdAt, updatedAt) 
    VALUES ('${body.name}', '${body.email}', '${body.password}', '${formatDate(
        new Date()
    )}', '${formatDate(new Date())}')`;
    return dbPool.execute(SQLQuery);
};

const updateUser = (body, id) => {
    const SQLQuery = `UPDATE users 
    SET name='${body.name}', email='${body.email}', address='${body.address}'
    WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
};

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM users WHERE id=${id}`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    queryGetAllUsers,
    queryGetUserDetailById,
    queryGetUserDetailByEmail,
    queryCreateNewUser,
    updateUser,
    deleteUser,
    usersModel,
};
