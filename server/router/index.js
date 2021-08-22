const router = require("express").Router();
const { adminAuthentication } = require("../middleware/admin");

const ApiRoute = require("./api");
const AdminRoute = require("./admin");

router.use("/api", ApiRoute);
router.use("/admin", adminAuthentication, AdminRoute);

module.exports = router;
