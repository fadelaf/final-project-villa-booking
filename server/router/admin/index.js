const route = require("express").Router();
const AdminController = require("../../controller/AdminController");
const { adminAuthentication } = require("../../middleware");
const { singlePhoto, multiplePhotos } = require("../../multer/multer");

route.get("/myVilla", AdminController.myVilla);
route.get("/detail/:id", AdminController.villaDetail);
route.get("/dashboard", AdminController.dashboardData);
route.post("/addVillas", multiplePhotos(), AdminController.addVillas);
route.post("/addImage/:villaId", multiplePhotos(), AdminController.addImage);
route.put("/updateProfile", singlePhoto(), AdminController.updateProfile);
route.put("/update/:id", multiplePhotos(), AdminController.updateVilla);
route.put("/setImagePrimary/:villaId", AdminController.setAsPrimary);
route.delete("/deleteImage/:villaId/:imgId", AdminController.deleteImage);
route.delete("/delete", AdminController.deleteVilla);

// route.post("/photo", multiplePhotos(), AdminController.photo);
module.exports = route;
