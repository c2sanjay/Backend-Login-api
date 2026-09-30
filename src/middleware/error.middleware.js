const { ZodError } = require('zod');

function errorMiddleware(err, req, res, next) {

  console.error(err);

  // Validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.issues
    });
  }

  // Normal application error
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Unknown error
  return res.status(500).json({
    message: 'Internal server error'
  });
}

module.exports = errorMiddleware;