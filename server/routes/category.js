const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');

router.get("/getAll", controller.getAll);
router.get("/getById/:categoryId", controller.getById);
router.post("/add", controller.add);
router.post("/update", controller.update);
router.post("/delete", controller.deleteById);

module.exports = router;