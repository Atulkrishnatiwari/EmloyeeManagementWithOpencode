const employeeService = require("../services/employeeService");

const getEmployees = async (req, res, next) => {
  try {
    const { employees, page, limit } = await employeeService.listEmployees({
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
    });
    res.status(200).json({ page, limit, data: employees });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const deleteAllEmployees = async (req, res, next) => {
  try {
    await employeeService.deleteAllEmployees();
    res.status(200).json({ message: "All employees deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    await employeeService.deleteEmployeeById(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteAllEmployees,
  deleteEmployeeById,
};
