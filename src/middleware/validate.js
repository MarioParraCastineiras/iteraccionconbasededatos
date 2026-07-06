function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }));

      return res.status(400).json({
        message: 'Validation error',
        errors
      });
    }

    req.body = result.data;
    next();
  };
}

module.exports = validate;
