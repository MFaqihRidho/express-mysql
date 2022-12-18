const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
    try {
        const data = await usersModel.findOne({
            where: { email: req.email },
            attributes: ["id", "email", "name"],
        });
        console.log(req.email);
        res.json({
            message: "Success get user",
            data,
        });
    } catch (error) {
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

const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password tidak sama",
        });
    }
    if (password.length < 8) {
        return res.status(400).json({
            message: "Password minimal 8 karakter",
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await usersModel.create({
            name,
            email,
            password: hashPassword,
        });
        res.status(201).json({
            message: "Succes register user",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!password) {
        return res.status(400).json({
            message: "Password kosong",
        });
    }
    if (!email) {
        return res.status(400).json({
            message: "Email kosong",
        });
    }
    try {
        const user = await usersModel.findOne({
            where: { email },
        });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(400).json({
                    message: "Password salah",
                });
            } else {
                const id = user.id;
                const name = user.name;
                const email = user.email;
                const accessToken = jwt.sign(
                    { id, name, email },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );
                const refreshToken = jwt.sign(
                    { id, name, email },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );
                await usersModel.update(
                    { refresh_token: refreshToken },
                    {
                        where: {
                            id,
                        },
                    }
                );
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.json({
                    message: "Login berhasil",
                    token: accessToken,
                });
            }
        } else {
            res.status(400).json({
                message: "Account tidak ditemukan",
            });
        }
    } catch (error) {}
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

module.exports = {
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
};
