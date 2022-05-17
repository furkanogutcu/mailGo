const express = require('express');
const router = express.Router();
const controller = require('../controllers/userRole');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/userRole');     // validation schemas
const authorization = require('../middlewares/authorization');  //Roles middleware
const mongodbIdChecker = require('../middlewares/mongodbIdChecker');    // mongodb id checker middleware

router.get("/getAll", authorization("Admin"), controller.getAll);
router.get("/getById/:id", mongodbIdChecker, authorization("Admin"), controller.getById);
router.route("/add").post(authorization("Admin"), validate(schemas.addValidation), controller.add);
router.route("/update").post(authorization("Admin"), validate(schemas.updateValidation), controller.update);
router.route("/delete").post(authorization("Admin"), validate(schemas.deleteValidation), controller.deleteById);

module.exports = router;