import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

const updateProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
const updateProfilePasswordSchema = z.object({
  oldPassword: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});
export default {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  updateProfilePasswordSchema,
};
