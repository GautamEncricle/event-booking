const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log("Error middleware" + err);
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  });
};
export default errorHandler;
