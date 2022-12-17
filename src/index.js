const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const users = require("./routes/users");

const app = express();

const authMiddleware = require("./middleware/auth");
const { json } = require("express");
const upload = require("./middleware/multer");

app.use(authMiddleware);
app.use(express.json());
app.use("/assets", express.static("public/images"));

app.use("/users", users);
app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        message: "Upload berhasil",
    });
});

app.use((err, req, res, next) => {
    res.json({
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
});
