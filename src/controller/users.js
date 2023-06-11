const {
    queryGetAllUsers,
    queryGetUserDetailById,
    queryGetUserDetailByEmail,
    usersModel,
    queryCreateNewUser,
} = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const getUser = async (req, res) => {
    try {
        const [rows] = await queryGetAllUsers();
        res.json({
            message: "Success get user",
            data: rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};

const getUserDetail = async (req, res) => {
    try {
        const { params } = req;
        const [rows] = await queryGetUserDetailById(params.id);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({
            message: "Success get user",
            data: rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};

// const createNewUser = async (req, res) => {
//     const { body } = req;
//     if (!body.name || body.email || body.address) {
//         return res.status(400).json({
//             message: "Bad Request",
//             data: null,
//         });
//     }

//     try {
//         await usersModel.createNewUser(body);
//         res.status(201).json({
//             message: "Success Create New User",
//             data: body,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error,
//         });
//     }
// };

const updateUser = async (req, res) => {
    const { name } = req.body;
    console.log(req.email);
    const user = await usersModel.findOne({
        where: { email: req.email },
    });
    if (!user) {
        return res.status(400).json({
            message: "Akun tidak ditemukan",
        });
    }
    try {
        await usersModel.update(
            { name },
            {
                where: {
                    email: req.email,
                },
            }
        );
        res.status(500).json({
            message: "Sukses update nama",
            data: {
                name,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

module.exports = {
    getUser,
    getUserDetail,
    updateUser,
};
