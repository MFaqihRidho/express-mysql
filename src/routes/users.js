const express = require("express");

const userController = require("../controller/users");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, userController.getUser);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.put("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
