const { z } = require('zod');

const studioSchema = z.object({
  name: z
    .string()
    .min(2, 'name must have at least 2 characters')
    .max(120, 'name must have at most 120 characters'),
  country: z
    .string()
    .min(2, 'country must have at least 2 characters')
    .max(80, 'country must have at most 80 characters'),
  founded_year: z
    .number({ invalid_type_error: 'founded_year must be a number' })
    .int('founded_year must be an integer')
    .min(1950, 'founded_year must be at least 1950')
    .max(new Date().getFullYear(), 'founded_year cannot be in the future')
});

module.exports = {
  studioSchema
};
