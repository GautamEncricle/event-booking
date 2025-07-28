class AppError {
  constructor(message = "Something went wrong", statusCode = 500) {
    if (statusCode > 500) {
      console.log(message);
      console.log(statusCode);
      throw new Error(message);
    }
    this.message = message;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
