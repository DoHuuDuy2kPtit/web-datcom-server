const express = require("express");
const router = express.Router();

const {
  verifytoken,
  // verifytokenHost,
} = require("../http/middlewares/auth.midllewares");
const hostsController = require("../http/controllers/host/host.controllers");

router.get("/hosts", verifytoken, hostsController.getAllHosts);

module.exports = router;
