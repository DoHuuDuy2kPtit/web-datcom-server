const express = require("express");
const router = express.Router();

const {
  validateIpnputSignup,
  validateIpnputSignin,
} = require("../http/middlewares/auth.midllewares");
const authController = require("../http/controllers/auth/auth.controllers");

router.post("/auth/signup", validateIpnputSignup, authController.signup);

router.post("/auth/signin", validateIpnputSignin, authController.signin);

router.post("/auth/otpAuthentication", authController.otpAuthentication);

router.post("/auth/resetOtpCode", authController.resetOtpCode);

module.exports = router;
