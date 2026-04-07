const express = require("express");
const morgan = require("morgan");
const { createHandler } = require("graphql-http/lib/use/express");
const employeeRoutes = require("./routes/employeeRoutes");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { ApiError, errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// REST endpoints
app.use("/employees", employeeRoutes);

// GraphQL endpoint
app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    formatError: (err) => ({ message: err.message }),
  })
);

// Fallback for unknown routes
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.use(errorHandler);

module.exports = app;
