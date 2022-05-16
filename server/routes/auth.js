const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/auth');     // validation schemas

router.route("/register").post(validate(schemas.registerValidation), controller.register);
router.route("/login").post(validate(schemas.loginValidation), controller.login);

module.exports = router;