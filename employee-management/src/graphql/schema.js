const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Employee {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    image: String
  }

  input EmployeeInput {
    name: String!
    email: String!
    mobile: String!
    image: String
  }

  type Query {
    employees(page: Int = 1, limit: Int = 10, search: String): [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
    deleteAllEmployees: Boolean!
  }
`);

module.exports = schema;
