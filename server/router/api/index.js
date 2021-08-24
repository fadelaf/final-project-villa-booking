const route = require("express").Router();
const ApiController = require("../../controller/ApiController");
const { singlePhoto } = require("../../multer/multer");
const { userAuthentication } = require("../../middleware");

route.post("/register", singlePhoto(), ApiController.register);
route.post("/login", ApiController.login);
route.post("/addComment/:id", userAuthentication, ApiController.addComment);

module.exports = route;
//
