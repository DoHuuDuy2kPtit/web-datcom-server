const jwt = require("jsonwebtoken");

const validateIpnputSignup = (req, res, next) => {
  const { userName, phoneNumber, email, passwords } = req.body;
  if (!userName || !email || !passwords || !phoneNumber) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống.",
    });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (userName.length < 5 || userName[0] !== userName[0].toUpperCase()) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Email không đúng định dạng.",
    });
  }

  if (passwords.length < 6) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.",
    });
  }

  if (!/[A-Z]/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.",
    });
  }

  if (!/\d/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ số.",
    });
  }

  next();
};

const validateIpnputSignin = (req, res, next) => {
  const { email, passwords } = req.body;
  if (!email || !passwords) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Thông tin không được để trống.",
    });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Email không đúng định dạng.",
    });
  }

  if (passwords.length < 6) {
    return res.status(400).json({
      status: "Lỗi",
      message:
        "Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số.",
    });
  }

  if (!/[A-Z]/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.",
    });
  }

  if (!/\d/.test(passwords)) {
    return res.status(400).json({
      status: "Lỗi",
      message: "Mật khẩu phải chứa ít nhất 1 chữ số.",
    });
  }

  next();
};

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ");
  console.log("token:", token);
  try {
    jwt.verify(token[1], process.env.SECRET_KEY, (err, user) => {
      console.log("user:", user);
      if (err) {
        res.status(403).json({
          message: "Token hết hạn hoặc không hợp lệ",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};

const verifytokenHost = (req, res, next) => {
  verifytoken(req, res, () => {
    // console.log(req.user.role);
    if (req.user.idUser === req.params.idUser || req.user.role === "host") {
      next();
    } else {
      res.status(403).json({
        warning: "Bạn không có quyền trong nghiệp vụ này",
      });
    }
  });
};

module.exports = {
  validateIpnputSignup,
  validateIpnputSignin,
  verifytoken,
  verifytokenHost,
};
