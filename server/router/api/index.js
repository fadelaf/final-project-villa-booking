const route = require("express").Router();
const ApiController = require("../../controller/ApiController");

route.post("/register", ApiController.register);
route.post("/login", ApiController.login);

module.exports = route;
