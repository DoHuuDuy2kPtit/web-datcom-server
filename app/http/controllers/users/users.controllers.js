// usersController.js
const userService = require("../../services/users.services");

const getAllUsers = async (req, res) => {
  const responseData = await userService.getAllUsers();
  return res.status(200).json(responseData);
};

const getOneUsers = async (req, res) => {
  const userId = req.params.id;
  const responseData = await userService.getOneUsers(userId);
  return res.status(200).json(responseData);
};

const createUser = async (req, res) => {
  try {
    const { userName, phoneNumber, email, passwords, confirmPassword } =
      req.body;
    if (passwords !== confirmPassword) {
      res.status(403).json({
        error: "Mật khẩu không trùng khớp",
      });
    } else {
      await userService.createUser(userName, phoneNumber, email, passwords);
      res.status(201).json({
        message: "Đăng ký thành công otp được gủi về Email:" + email,
      });
    }
  } catch (error) {
    console.log("errorController:", error);
    res.status(500).json({
      errorController: error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetPassword(email);
    res.status(200).json({
      message: `Mật khẩu đã được gửi về email: ${email}`,
    });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      errortt: error,
    });
  }
};

const changePassword = async (req, res) => {
  const { email, passwords, newPassword } = req.body;
  try {
    const pw = await userService.changePassword(
      email,
      passwords,
      newPassword,
      // confirmNewPassword
    );

    if (!pw) {
      res.status(200).json({
        message: `Mật khẩu đã được đổi thành công`,
      });
    } else {
      res.status(401).json({
        errors: { passwords: "Mật khẩu cũ không chính xác" },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const updateUserName = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.body;
  try {
    const responseData = await userService.updateUserName(id, userName);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

const updateAvatarUser = async (req, res) => {
  const { id } = req.params;
  const { avatarUser } = req.body;
  try {
    const responseData = await userService.updateAvatarUser(id, avatarUser);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUsers,
  createUser,
  resetPassword,
  changePassword,
  updateUserName,
  updateAvatarUser,
};
