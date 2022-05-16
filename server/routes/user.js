const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/user');     // validation schemas
const authorization = require('../middlewares/authorization');  //Roles middleware

router.get("/getAll", authorization("Admin"), controller.getAll);
router.get("/getById/:userId", authorization("Admin"), controller.getById);
router.route("/update").post(authorization("Admin"), validate(schemas.updateValidation), controller.update);
router.route("/delete").post(authorization("Admin"), validate(schemas.deleteValidation), controller.deleteById);

module.exports = router;