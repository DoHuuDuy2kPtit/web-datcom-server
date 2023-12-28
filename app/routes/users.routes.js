// userRouter.js
const express = require("express");
const router = express.Router();

const {
  verifytoken,
  verifytokenHost,
} = require("../http/middlewares/auth.midllewares");
const userController = require("../http/controllers/users/users.controllers");

router.get("/users", verifytoken, verifytokenHost, userController.getAllUsers);

router.get("/users/:id", verifytoken, userController.getOneUsers);

router.post("/users", userController.createUser);

router.post("/users/resetPassword", userController.resetPassword);

router.post("/users/changePassword", userController.changePassword);

module.exports = router;
