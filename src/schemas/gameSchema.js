const { z } = require('zod');

const gameSchema = z.object({
  title: z
    .string()
    .min(1, 'title is required')
    .max(150, 'title must have at most 150 characters'),
  genre: z
    .string()
    .min(2, 'genre must have at least 2 characters')
    .max(80, 'genre must have at most 80 characters'),
  release_year: z
    .number({ invalid_type_error: 'release_year must be a number' })
    .int('release_year must be an integer')
    .min(1950, 'release_year must be at least 1950')
    .max(new Date().getFullYear(), 'release_year cannot be in the future'),
  studio_id: z
    .number({ invalid_type_error: 'studio_id must be a number' })
    .int('studio_id must be an integer')
    .positive('studio_id must be positive')
});

module.exports = {
  gameSchema
};
