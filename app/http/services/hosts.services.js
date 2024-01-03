const Hosts = require("../../models/hosts.models");

exports.getAllHosts = async () => {
    const users = await Hosts.query().select("*");
    return users;
  };