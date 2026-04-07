const EmployeeModel = require("../models/employeeModel");
const { ApiError } = require("../middlewares/errorHandler");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmployeeInput = ({ name, email, mobile }) => {
  if (!name || !name.trim()) {
    throw new ApiError(400, "Name is required");
  }
  if (!mobile || !mobile.trim()) {
    throw new ApiError(400, "Mobile is required");
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Valid email is required");
  }
};

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new ApiError(400, "Invalid employee id");
  }
  return parsed;
};

const listEmployees = async ({ page = 1, limit = 10, search }) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const safePage = Math.max(Number(page) || 1, 1);
  const offset = (safePage - 1) * safeLimit;

  const employees = await EmployeeModel.getAll({
    limit: safeLimit,
    offset,
    search: search ? String(search).trim() : null,
  });

  return { employees, page: safePage, limit: safeLimit };
};

const getEmployeeById = async (id) => {
  const employeeId = parseId(id);
  const employee = await EmployeeModel.getById(employeeId);
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }
  return employee;
};

const createEmployee = async (payload) => {
  validateEmployeeInput(payload);
  return EmployeeModel.create(payload);
};

const updateEmployee = async (id, payload) => {
  const employeeId = parseId(id);
  validateEmployeeInput(payload);
  const updated = await EmployeeModel.update(employeeId, payload);
  if (!updated) {
    throw new ApiError(404, "Employee not found");
  }
  return updated;
};

const deleteAllEmployees = async () => {
  await EmployeeModel.deleteAll();
  return true;
};

const deleteEmployeeById = async (id) => {
  const employeeId = parseId(id);
  const deleted = await EmployeeModel.deleteById(employeeId);
  if (!deleted) {
    throw new ApiError(404, "Employee not found");
  }
  return true;
};

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteAllEmployees,
  deleteEmployeeById,
};
