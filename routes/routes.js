const router = require("express").Router();
const {
  aboutController,
  homeController,
} = require("../controllers/controller.js");

router.get("/", homeController);

router.get("/about", aboutController);
module.exports = router;
