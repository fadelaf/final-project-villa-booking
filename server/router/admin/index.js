const route = require("express").Router();
const AdminController = require("../../controller/AdminController");
const { adminAuthentication } = require("../../middleware");
const { singlePhoto, multiplePhotos } = require("../../multer/multer");

route.get("/myVilla", AdminController.myVilla);
route.get("/myVilla/detail/:id", AdminController.villaDetail);
route.post("/addVillas", multiplePhotos(), AdminController.addVillas);
route.put("/updateProfile", singlePhoto(), AdminController.updateProfile);

// route.post("/photo", multiplePhotos(), AdminController.photo);
module.exports = route;
