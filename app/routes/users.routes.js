// userRouter.js
const express = require("express");
const router = express.Router();

const {
  verifytoken,
  // verifytokenHost,
  validateInputChangePw,
} = require("../http/middlewares/auth.midllewares");
const userController = require("../http/controllers/users/users.controllers");

router.get("/users", verifytoken, userController.getAllUsers);

router.get("/users/:id", verifytoken, userController.getOneUsers);

router.post("/users", userController.createUser);

router.post("/users/resetPassword", userController.resetPassword);

router.post(
  "/users/changePassword",
  verifytoken, // kiểm tra đăng nhập
  validateInputChangePw, // validate input
  userController.changePassword
);

router.patch(
  "/users/updateUserName/:id",
  verifytoken,
  userController.updateUserName
);

router.patch(
  "/users/updateAvatarUser/:id",
  verifytoken,
  userController.updateAvatarUser
);

module.exports = router;
