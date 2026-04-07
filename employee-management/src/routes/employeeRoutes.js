const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/", employeeController.deleteAllEmployees);
router.delete("/:id", employeeController.deleteEmployeeById);

module.exports = router;
