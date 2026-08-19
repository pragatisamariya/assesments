const express = require("express");
const router = express.Router();
const controller = require("../controller/staff.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/me"  ,authMiddleware, controller.meController);
router.post("/register" , controller.registerController);
router.post("/login" , controller.loginController);

router.post("/logout" , controller.logout);

module.exports = router;