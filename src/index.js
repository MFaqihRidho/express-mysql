const express = require("express");
const db = require("./config/database");
const UsersModel = require("./models/users");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const users = require("./routes/users");

const app = express();


const { json } = require("express");
const upload = require("./middleware/multer");

app.use(express.json());
app.use("/assets", express.static("public/images"));

const check = async () => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

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
