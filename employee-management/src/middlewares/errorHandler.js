class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err.code === "23505") {
    res.status(400).json({ message: "Email already exists" });
    return;
  }

  const status = err.statusCode || 500;
  const payload = {
    message: err.message || "Internal Server Error",
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (status >= 500) {
    console.error("Unhandled error", err);
  }

  res.status(status).json(payload);
};

module.exports = { ApiError, errorHandler };
