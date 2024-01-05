const jwt = require("jsonwebtoken");

const validateIpnputSignup = (req, res, next) => {
  const { userName, phoneNumber, email, passwords, confirmPassword } = req.body;
  const errors = {};

  if (!userName) {
    errors.userName = "Vui lòng nhập tên người dùng";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Vui lòng nhập số điện thoại";
  }

  if (!email) {
    errors.email = "Vui lòng nhập địa chỉ email";
  }

  if (!passwords) {
    errors.passwords = "Vui lòng nhập mật khẩu";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Vui lòng nhập mật khẩu";
  }
  if (confirmPassword !== passwords) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  if (userName.length < 5 || userName[0] !== userName[0].toUpperCase()) {
    errors.userName =
      "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa";
  }

  if (!regexPhoneNumber.test(phoneNumber)) {
    errors.phoneNumber = "Số điện thoại không hợp lệ.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Email không đúng định dạng.";
  }

  if (passwords.length < 6) {
    errors.passwords =
      "Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.";
  }

  if (!/[A-Z]/.test(passwords)) {
    errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.";
  }

  if (!/\d/.test(passwords)) {
    errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ số.";
  }

  // Nếu có lỗi, trả về thông báo lỗi
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateIpnputSignin = (req, res, next) => {
  const { email, passwords } = req.body;
  const errors = {};

  if (!email) {
    errors.email = "Vui lòng nhập địa chỉ email";
  }

  if (!passwords) {
    errors.passwords = "Vui lòng nhập mật khẩu";
  }

  if (email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      errors.email = "Email không đúng định dạng.";
    }
  }

  if (passwords) {
    if (passwords.length < 6) {
      errors.passwords =
        "Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.";
    } else {
      if (!/[A-Z]/.test(passwords)) {
        errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.";
      }
      if (!/\d/.test(passwords)) {
        errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ số.";
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateInputChangePw = (req, res, next) => {
  const { passwords, newPassword, confirmNewPassword } = req.body;
  const errors = {};

  // if (newPassword !== confirmNewPassword) {
  //   errors.confirmNewPassword = "Mật khẩu không khớp";
  // }

  if (!/[A-Z]/.test(passwords)) {
    errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.";
  }

  if (!/[a-z]/.test(newPassword)) {
    errors.newPassword = "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.";
  }

  // if (!/[a-z]/.test(confirmNewPassword)) {
  //   errors.confirmNewPassword =
  //     "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.";
  // }

  if (!/\d/.test(passwords)) {
    errors.passwords = "Mật khẩu phải chứa ít nhất 1 chữ số.";
  }

  if (!/\d/.test(newPassword)) {
    errors.newPassword = "Mật khẩu phải chứa ít nhất 1 chữ số.";
  }
  // if (!/\d/.test(confirmNewPassword)) {
  //   errors.confirmNewPassword = "Mật khẩu phải chứa ít nhất 1 chữ số.";
  // }

  if (passwords.length < 6) {
    errors.passwords = "Mật khẩu phải có ít nhất 6 kí tự.";
  }

  if (newPassword.length < 6) {
    errors.newPassword = "Mật khẩu phải có ít nhất 6 kí tự.";
  }

  // if (confirmNewPassword.length < 6) {
  //   errors.confirmNewPassword = "Mật khẩu phải có ít nhất 6 kí tự.";
  // }

  // if (!confirmNewPassword) {
  //   errors.confirmNewPassword = "Không được để trống";
  // }

  if (!passwords) {
    errors.passwords = "Không được để trống";
  }
  if (!newPassword) {
    errors.newPassword = "Không được để trống";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  // console.log("token:", token);
  if (!token || token.length !== 2) {
    return res.status(403).json({
      message: "Token không tồn tại hoặc không hợp lệ",
    });
  }

  try {
    jwt.verify(token[1], process.env.SECRET_KEY, (err, user) => {
      console.log("user:", user);

      if (err) {
        return res.status(403).json({
          message: "Hết hạn đăng nhập.",
        });
      }
      req.user = user;

      next();
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

const verifytokenHost = (req, res, next) => {
  verifytoken(req, res, () => {
    // console.log(req.user.role);
    if (req.user.idUser === req.params.idUser || req.user.role === "host") {
      next();
    } else {
      return res.status(403).json({
        warning: "Bạn không có quyền trong nghiệp vụ này",
      });
    }
  });
};

module.exports = {
  validateIpnputSignup,
  validateIpnputSignin,
  validateInputChangePw,
  verifytoken,
  verifytokenHost,
};
