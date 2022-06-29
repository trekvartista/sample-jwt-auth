const Router = require("express").Router;
const router = Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");

router.post("/register", 
	body("email").isEmail().withMessage("Email is not valid"),
	body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
	userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
