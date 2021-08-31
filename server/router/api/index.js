const route = require("express").Router();
const ApiController = require("../../controller/ApiController");
const { singlePhoto } = require("../../multer/multer");
const { userAuthentication } = require("../../middleware");

route.post("/register", singlePhoto(), ApiController.register);
route.post("/login", ApiController.login);
route.post("/add-cart", userAuthentication, ApiController.addToCart);
route.post("/payment", userAuthentication, ApiController.Payment);
route.get("/villa/:page?", ApiController.getVilla);
route.get("/detail/:id", ApiController.getVillaDetail);
route.get("/show-cart", userAuthentication, ApiController.showCart);
route.get("/order/:cartId", userAuthentication, ApiController.bookSummary);
route.get("/show-list", userAuthentication, ApiController.showList);
route.put(
  "/update",
  userAuthentication,
  singlePhoto(),
  ApiController.updateProfile
);
route.put(
  "/cancel-order/:orderId",
  userAuthentication,
  ApiController.orderCancel
);
route.delete(
  "/delete-cart/:cartId",
  userAuthentication,
  ApiController.deleteCart
);
route.post("/addComment/:id", userAuthentication, ApiController.addComment);
route.post("/add-order", userAuthentication, ApiController.addOrder);

module.exports = route;
//
