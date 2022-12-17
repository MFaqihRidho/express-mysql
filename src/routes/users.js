const express = require("express");

const userController = require("../controller/users");

const router = express.Router();

router.get("/", userController.getAllUser);

router.post("/insert", userController.createNewUser);

router.put("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
