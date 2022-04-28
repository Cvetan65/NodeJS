const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userValidator = require("../middleware/user-validation.middleware");

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
