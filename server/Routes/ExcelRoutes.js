const express = require("express");
const router = express.Router();
const ExcelService = require('../Service/ExcelService');
const ExcelController= require('../Controller/ExcelController');

router.post("/postexceldata", ExcelController.getExcelData)
router.get("/getemployeedata", ExcelController.getDatabaseData);
router.post("/deletedata", ExcelController.deleteData);
router.post("/updatedata", ExcelController.editData);
router.post("/saveemployee", ExcelController.saveEmployee);

module.exports = router