const usersModel = require("../models/users");

const getAllUser = async (req, res) => {
    try {
        const [data] = await usersModel.getAllUsers();
        res.json({
            message: "Success get all user",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

const createNewUser = async (req, res) => {
    const { body } = req;

    if (!body.name || body.email || body.address) {
        return res.status(400).json({
            message: "Bad Request",
            data: null,
        });
    }

    try {
        await usersModel.createNewUser(body);
        res.status(201).json({
            message: "Success Create New User",
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        await usersModel.updateUser(body, id);
        res.status(201).json({
            message: `Success update user ${body.name}`,
            data: { id, ...body },
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await usersModel.deleteUser(id);
        res.json({
            message: `Success delete user`,
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

module.exports = { getAllUser, createNewUser, updateUser, deleteUser };
