const {
    queryGetUserDetailByEmail,
    queryUpdateUserRefreshToken,
    queryCreateNewUser,
} = require("../models/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!password) {
        return res.status(400).json({
            message: "Password empty",
        });
    }
    if (!email) {
        return res.status(400).json({
            message: "Email empty",
        });
    }
    try {
        const [users] = await queryGetUserDetailByEmail(email);
        if (users.length > 0) {
            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    message: "Wrong email or password",
                });
            }
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
            await queryUpdateUserRefreshToken({ refreshToken }, id);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
            });
            return res.json({
                message: "Success login",
                token: accessToken,
            });
        }
        return res.status(400).json({
            message: "Account Not Found",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

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
    const [checkEmailExist] = await queryGetUserDetailByEmail(email);
    if (checkEmailExist.length > 0) {
        return res.status(400).json({
            message: "Email sudah terdaftar",
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const body = {
            name,
            email,
            password: hashPassword,
        };
        await queryCreateNewUser(body);
        res.status(201).json({
            message: "Succes register user",
            data: { name, email },
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

module.exports = {
    loginUser,
    registerUser,
};
