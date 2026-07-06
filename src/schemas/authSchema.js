const { z } = require('zod');

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'username must have at least 3 characters')
    .max(50, 'username must have at most 50 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'username must be alphanumeric'),
  email: z.email('email must be valid').toLowerCase(),
  password: z
    .string()
    .min(8, 'password must have at least 8 characters')
    .regex(/[A-Z]/, 'password must include an uppercase letter')
    .regex(/[0-9]/, 'password must include a number')
});

const loginSchema = z.object({
  email: z.email('email must be valid').toLowerCase(),
  password: z.string().min(1, 'password is required')
});

module.exports = {
  registerSchema,
  loginSchema
};
