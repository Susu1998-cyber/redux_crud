const express = require("express");
const { check } = require("express-validator");
const employeeController = require("../controller/employeController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, employeeController.createEmployee);
router.get("/getemploye", authMiddleware, employeeController.getAllEmployees);
router.put(
  "/editemployee/:id",
  authMiddleware,
  employeeController.editEmployee
);
router.delete("/delete/:id", authMiddleware, employeeController.deleteEmployee);
module.exports = router;
