const express = require("express");
const router = express.Router();
const {
  userLogin,
  userRegister,
  userLogout,
} = require("../controllers/userControllers");


router.post("/login", userLogin);
router.post("/registerUser", userRegister);
router.post("/logout", userLogout);

module.exports = router;