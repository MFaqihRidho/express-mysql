const express = require("express");

const userController = require("../controller/users");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, userController.getUser);

router.get("/:id", authMiddleware, userController.getUserDetail);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/update", authMiddleware, userController.updateUser);

module.exports = router;
