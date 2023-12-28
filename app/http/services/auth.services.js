// authservice

const usersService = require("./users.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = (userName, phoneNumber, email, passwords) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwords, salt);
    return usersService.createUser(userName, phoneNumber, email, hash);
  } catch (error) {
    return error;
  }
};

const signin = async (email, passwords) => {
  try {
    const checkUser = await usersService.checkUserEmail(email);
    // console.log("checkUser:", checkUser);
    if (!checkUser) {

      return {
        status: false,
        message: "Tài khoản không tồn tại hoặc sai mật khẩu",
      };
    } else {
      const checkPassword = checkUser.passwords;
      const compare = bcrypt.compareSync(passwords, checkPassword);
      if (!compare) {
        return {
          status: false,
          message: "Mật khẩu đăng nhập không chính xác",
        };
      }
      const user = {
        idUser: checkUser.idUser,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      };
      const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "120s",
      });
      

      return {
        status: true,
        user,
        accessToken,
      };
    }
  } catch (error) {
    return error;
  }
};

module.exports = { signup, signin };
