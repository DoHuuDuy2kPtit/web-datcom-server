// authController

const authService = require("../../services/auth.services");
const userService = require("../../services/users.services");

// đăng  kí
const signup = async (req, res) => {
  const { userName, phoneNumber, email, passwords, confirmPassword } = req.body;
  try {
    if (passwords !== confirmPassword) {
      res.status(400).json({
        errors: { passwords: "Mật khẩu không trùng khớp" },
      });
    } else {
      await authService.signup(
        userName,
        phoneNumber,
        email,
        passwords,
        confirmPassword
      );
      res.status(200).json({
        message: `OTP đã được gủi về email: ${email}`,
      });
    }
  } catch (error) {
    console.log("erroreee:", error);
    if (
      error.nativeError.sqlMessage ==
      `Duplicate entry '${email}' for key 'users.users_email_unique'`
    ) {
      res.status(403).json({
        errors: { email: "Email đã được đăng kí" },
      });
    }
    if (
      error.nativeError.sqlMessage ==
      `Duplicate entry '${phoneNumber}' for key 'users.users_phonenumber_unique'`
    ) {
      res.status(403).json({
        errors: { phoneNumber: "Số điện thoại đã tồn tại" },
      });
    }
  }
};

// Đăng nhập
const signin = async (req, res) => {
  const { email, passwords } = req.body;
  try {
    const signinResult = await authService.signin(email, passwords);
    // console.log("signinResult:", signinResult)

    if (signinResult.status) {
      res.json({
        message: `Chúc ${signinResult.user.userName} ngon miệng!`,
        // message: "Đăng nhập thành công",
        signinResult,
      });
    } else {
      res.status(400).json({
        status: false,
        errors: signinResult,
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      status: false,
      errors: error || "Có lỗi xảy ra",
    });
  }
};

// Nhập mã otp code
const otpAuthentication = async (req, res) => {
  const { otpCode, email } = req.body;
  try {
    const resultOtpCode = await userService.checkOtpAndEmail(email, otpCode);
    if (resultOtpCode.otpCode === otpCode) {
      await userService.updateAuthenticationStatus(email);
      res.status(201).json({
        message: "Xác thực thành công",
      });
    }
  } catch (error) {
    console.log("errorcontrollerotp:", error);
    res.status(400).json({
      errors: { message: "OTP không chính xác" },
    });
  }
};

// reset otp code
const resetOtpCode = async (req, res) => {
  const { email } = req.body;
  try {
    const checkEmail = await userService.checkUserEmail(email);
    if (checkEmail) {
      await userService.resetOtpCode(email);
      res.status(201).json({
        message: `OTP đã được gủi về Email: ${email}`,
      });
    }
  } catch (error) {
    console.log("error:", error);

    res.status(500).json({
      error: "Có lỗi xảy ra.",
    });
  }
};

module.exports = { signup, signin, otpAuthentication, resetOtpCode };
