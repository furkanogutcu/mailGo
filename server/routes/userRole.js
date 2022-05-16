const express = require('express');
const router = express.Router();
const controller = require('../controllers/userRole');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/userRole');     // validation schemas

router.get("/getAll", controller.getAll);
router.get("/getById/:userRoleId", controller.getById);
router.route("/add").post(validate(schemas.addValidation), controller.add);
router.route("/update").post(validate(schemas.updateValidation), controller.update);
router.route("/delete").post(validate(schemas.deleteValidation), controller.deleteById);

module.exports = router;