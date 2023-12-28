// usersService.js
const Users = require("../../models/users.models");
const transporter = require("../../helpers/modemailer.helpers");
const bcrypt = require("bcrypt");

// random password
const randomPassword = () => {
  const mk = "Rikkei";
  const randomNumber = Math.floor(Math.random() * 10000);
  const password = mk + randomNumber;
  return password;
};

// random otpcode
const randomOtpCode = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

// lấy  tất cả user
exports.getAllUsers = async () => {
  const users = await Users.query().select("*");
  return users;
};

// lấy một user
exports.getOneUsers = async (userId) => {
  const users = await Users.query().select("*").where("idUser", userId).first();
  return users;
};

// check Email
exports.checkUserEmail = async (email) => {
  try {
    const user = await Users.query().select("*").where("email", email).first();
    return user;
  } catch (error) {
    console.log("Error checking user email:", error);
    throw error;
  }
};

// check otp để xác nhận tài khoản
exports.checkOtpAndEmail = async (email, otpCode) => {
  try {
    const resultOtp = await Users.query()
      .select("*")
      .where("email", email)
      .andWhere("otpCode", otpCode)
      .first();
    return resultOtp;
  } catch (error) {
    return error;
  }
};

// update status nếu xác thực thành công
exports.updateAuthenticationStatus = async (email) => {
  const updateStatus = await Users.query()
    .update({ status: "Đã xác thực" })
    .where("email", email);
  return updateStatus;
};

// lấy lại otp
exports.resetOtpCode = async (email) => {
  const otp = randomOtpCode();
  const mailOptions = {
    from: process.env.EMAIL_ADMIN,
    to: email,
    subject: "OTP mới của bạn.",
    text: `Mã OTP của bạn là: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return res.status(200).json({
        message: `Mã OTP đã được gửi về email: ${email}`,
      });
      // console.log("Email sent: " + info.response);
    }
  });
  const resetOtp = await Users.query()
    .update({ otpCode: otp })
    .where("email", email);
  return resetOtp;
};

// thêm user
exports.createUser = async (userName, phoneNumber, email, passwords, res) => {
  try {
    const imageUser = "https://s.net.vn/TD1o";
    const otp = randomOtpCode();
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "OTP xác thực đăng kí",
      text: `Mã xác thực OTP của bạn là: ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({
          message: `Mã OTP đã được gửi về email: ${email}`,
        });
        // console.log("Email sent: " + info.response);
      }
    });
    await Users.query()
      .insert([
        {
          userName,
          phoneNumber,
          email,
          passwords,
          avatarUser: imageUser,
          otpCode: otp,
        },
      ])
      .first();
  } catch (error) {
    console.log("errorService:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// quên mật khẩu
exports.resetPassword = async (email) => {
  try {
    const newPassword = randomPassword();

    const checkUser = await exports.checkUserEmail(email);
    // console.log("checkUser:", checkUser.email)

    if (email === checkUser.email) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: email,
        subject: "Rice lấy lại mật khẩu",
        text: `Mật khẩu mới của bạn là: ${newPassword}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          return res.status(200).json({
            message: `Mật khẩu đã được gửi về email: ${email}`,
          });
          // console.log("Email sent: " + info.response);
        }
      });
      await Users.query().update({ passwords: hash }).where("email", email);
    }
  } catch (error) {
    return error;
  }
};

// đổi mật khẩu
exports.changePassword = async (email, passwords, newPassword) => {
  try {
    const checkUser = await exports.checkUserEmail(email);
    // console.log("checkUser:", checkUser.email)
    if (checkUser.email) {
      const pwOld = checkUser.passwords;
      const passwordContent = bcrypt.compareSync(passwords, pwOld);
      if (passwordContent) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        await Users.query().update({ passwords: hash }).where("email", email);
      } else {
        return {
          message: "Mật khẩu cũ không chính xác",
        };
      }
    }
  } catch (error) {
    console.log("errorService:", error);
    return {
      error: error,
    };
  }
};
