const { Sequelize } = require("sequelize");
const db = require("../config/database");

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

// const getAllUsers = () => {
//     return
//     const SQLQuery = "SELECT * FROM users";
//     return db.execute(SQLQuery);
// };

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (name, email, address) 
    VALUES ('${body.name}', '${body.email}', '${body.address}')`;
    return db.execute(SQLQuery);
};

const registerUser = (body) => {
    const SQLQuery = `INSERT INTO users (name, email, password) 
    VALUES ('${body.name}', '${body.email}', '${body.password}')`;
    return db.execute(SQLQuery);
};

const updateUser = (body, id) => {
    const SQLQuery = `UPDATE users 
    SET name='${body.name}', email='${body.email}', address='${body.address}'
    WHERE id=${id}`;
    return db.execute(SQLQuery);
};

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM users WHERE id=${id}`;
    return db.execute(SQLQuery);
};

module.exports = usersModel;
