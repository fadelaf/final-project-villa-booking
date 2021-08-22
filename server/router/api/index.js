const route = require("express").Router();
const ApiController = require("../../controller/ApiController");
const { singlePhoto } = require("../../multer/multer");

route.post("/register", singlePhoto(), ApiController.register);
route.post("/login", ApiController.login);

module.exports = route;
