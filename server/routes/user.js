const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/user');     // validation schemas

router.get("/getAll", controller.getAll);
router.get("/getById/:userId", controller.getById);
router.route("/update").post(validate(schemas.updateValidation), controller.update);
router.route("/delete").post(validate(schemas.deleteValidation), controller.deleteById);

module.exports = router;