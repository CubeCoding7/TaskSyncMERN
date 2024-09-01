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
	.trim();

const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z
	.object({
		email: emailSchema.optional(), // Optional here
		username: usernameSchema.optional(), // Optional here
		password: passwordSchema,
		userAgent: z.string().optional(),
	})
	.refine(
		(data) => data.email || data.username, // Ensure at least one is provided
		{
			message: 'Either username or email is required',
			path: ['username', 'email'], // Attach error to both fields
		}
	);

export const registerSchema = z
	.object({
		email: emailSchema,
		username: usernameSchema,
		password: passwordSchema,
		confirmPassword: passwordSchema,
		userAgent: z.string().optional(),
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
