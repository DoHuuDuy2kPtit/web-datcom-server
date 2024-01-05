// authservice

const usersService = require("./users.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (userName, phoneNumber, email, passwords) => {
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
        email: "Tài khoản không tồn tại !",
      };
    } else {
      if (checkUser.status === "Chưa xác thực") {
        return {
          status: false,
          email: "Tài khoản của bạn chưa xác thực !",
        };
      }
      const checkPassword = checkUser.passwords;
      const compare = bcrypt.compareSync(passwords, checkPassword);
      if (!compare) {
        return {
          status: false,
          passwords: "Mật khẩu đăng nhập không chính xác !",
        };
      }
      const user = {
        idUser: checkUser.idUser,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      };
      const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return {
        status: true,
        user,
        accessToken,
      };
    }
  } catch (error) {
    console.log("error auth:", error);
    return error;
  }
};

module.exports = { signup, signin };
