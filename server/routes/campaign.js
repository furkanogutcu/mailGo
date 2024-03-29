const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaign');
const validate = require('../middlewares/validate');    // validate middleware
const schemas = require('../validations/campaign');     // validation schemas
const authorization = require('../middlewares/authorization');  //Roles middleware
const mongodbIdChecker = require('../middlewares/mongodbIdChecker');    // mongodb id checker middleware

router.get("/getAll", controller.getAll);
router.get("/getById/:id", mongodbIdChecker, controller.getById);
router.get("/increase-total-click/:id", mongodbIdChecker, controller.increaseTotalClick);
router.route("/email/get-list/:id").get(authorization("Admin"), mongodbIdChecker, controller.getEmailList);
router.route("/email/send/:id").get(authorization("Admin"), mongodbIdChecker, controller.sendEmailSubscribers);
router.route("/add").post(authorization("Admin"), validate(schemas.addValidation), controller.add);
router.route("/update").post(authorization("Admin"), validate(schemas.updateValidation), controller.update);
router.route("/delete").post(authorization("Admin"), validate(schemas.deleteValidation), controller.deleteById);

module.exports = router;