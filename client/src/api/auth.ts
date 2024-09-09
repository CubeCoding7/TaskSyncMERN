import API from '../config/apiClient';
import { User } from '../types';

// Response Interfaces
interface LoginResponse {
	token: string;
	user: User;
}

interface RegisterResponse {
	user: User;
}

interface VerifyEmailResponse {
	message: string;
}

interface SendPasswordResetEmailResponse {
	message: string;
}

interface ResetPasswordResponse {
	message: string;
}

// Data Interfaces
interface LoginData {
	email: string;
	password: string;
}

interface RegisterData {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

interface ResetPasswordData {
	verificationCode: string;
	password: string;
}

// Auth Functions
export const login = async (data: LoginData): Promise<LoginResponse> => {
	return API.post('/auth/login', data);
};

export const logout = async (): Promise<void> => {
	return API.get('/auth/logout');
};

export const register = async (
	data: RegisterData
): Promise<RegisterResponse> => {
	return API.post('/auth/register', data);
};

export const verifyEmail = async (
	verificationCode: string
): Promise<VerifyEmailResponse> => {
	return API.get(`/auth/email/verify/${verificationCode}`);
};

export const sendPasswordResetEmail = async (
	email: string
): Promise<SendPasswordResetEmailResponse> => {
	return API.post('/auth/password/forgot', { email });
};

export const resetPassword = async (
	data: ResetPasswordData
): Promise<ResetPasswordResponse> => {
	return API.post('/auth/password/reset', data);
};
