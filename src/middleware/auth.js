const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (req.headers["x-api-key"] === "3lpsycongr0" && token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Unathorized",
                });
            } else {
                req.email = decoded.email;
                return next();
            }
        });
    } else {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
};

module.exports = auth;
