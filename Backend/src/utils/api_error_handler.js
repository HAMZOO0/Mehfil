//API_Error_handler is presumably a custom error handler class you have to handle specific types of errors with a status code and message.
class API_Error_handler extends Error {
  constructor(
    statusCode,
    message = "someting went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    // super(stack);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // here we trace error
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { API_Error_handler };
