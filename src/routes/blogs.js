const express = require("express");

const blogController = require("../controller/blogs");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", blogController.getAllBlog);

router.post("/create", authMiddleware, blogController.createBlog);

module.exports = router;
