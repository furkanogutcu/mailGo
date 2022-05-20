const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaign');
const mongodbIdChecker = require('../middlewares/mongodbIdChecker');    // mongodb id checker middleware

router.get("/campaign/redirect/:id", mongodbIdChecker, controller.emailRedirect);

module.exports = router;