const express = require("express");
const db = require("./config/database");
const blogModel = require("./models/blogs");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

const { json } = require("express");
const upload = require("./middleware/multer");

app.use(express.json());
app.use("/assets", express.static("public/images"));

const check = async () => {
    try {
        await db.authenticate();
        await blogModel.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        message: "Upload berhasil",
    });
});

// users
const users = require("./routes/users");
app.use("/users", users);

// users
const auths = require("./routes/auths");
app.use("/auths", auths);

// blogs
const blogs = require("./routes/blogs");
app.use("/blogs", blogs);

app.use((err, req, res, next) => {
    res.json({
        message: err.message,
    });
});

app.listen(PORT, () => {
    // check();
    console.log(`run on ${PORT}`);
});
