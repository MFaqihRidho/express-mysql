const auth = (req, res, next) => {
    if (req.headers["x-api-key"] === "3lpsycongr0") {
        return next();
    } else {
        res.status(401);
        res.json({
            message: "Unauthorized",
        });
        return;
    }
};

module.exports = auth;
