const router = require("express").Router();

const ApiRoute = require("./api");
router.use("/api", ApiRoute);

module.exports = router;
