const route = require("express").Router();
const AdminController = require("../../controller/AdminController");
const { adminAuthentication } = require("../../middleware");
const { singlePhoto, multiplePhotos } = require("../../multer/multer");

route.get("/addVillas", AdminController.addVillas);

route.post("/photo", multiplePhotos(), AdminController.photo);
module.exports = route;
