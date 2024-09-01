import { z } from 'zod';

export const emailSchema = z.string().email().min(1).max(255);

const usernameSchema = z
	.string()
	.min(3, 'Username must be at least 3 characters long')
	.max(32, 'Username must be at most 32 characters long')
	.regex(
		/^[a-zA-Z0-9_]+$/,
		'Username can only contain letters, numbers, and underscores'
	)
	.nonempty('Username is required')
	.trim();

const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
	email: emailSchema,
	username: usernameSchema,
	password: passwordSchema,
	userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
	.extend({
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const verificationCodeSchema = z.string().min(1).max(24);

export const resetPasswordSchema = z.object({
	password: passwordSchema,
	verificationCode: verificationCodeSchema,
});
