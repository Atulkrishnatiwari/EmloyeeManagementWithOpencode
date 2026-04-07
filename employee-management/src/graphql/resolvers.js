const employeeService = require("../services/employeeService");

const resolvers = {
  employees: async ({ page, limit, search }) => {
    const { employees } = await employeeService.listEmployees({
      page,
      limit,
      search,
    });
    return employees;
  },
  employee: async ({ id }) => employeeService.getEmployeeById(id),
  createEmployee: async ({ input }) => employeeService.createEmployee(input),
  updateEmployee: async ({ id, input }) => employeeService.updateEmployee(id, input),
  deleteEmployee: async ({ id }) => employeeService.deleteEmployeeById(id),
  deleteAllEmployees: async () => employeeService.deleteAllEmployees(),
};

module.exports = resolvers;
