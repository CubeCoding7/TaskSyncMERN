import API from '../config/apiClient';
import { List } from './types';

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

export interface User {
	id: string;
	username: string;
	email: string;
	token: string;
}

interface Session {
	id: string;
	createdAt: string;
	expiresAt: string;
}

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

export const login = async (data: LoginData): Promise<LoginResponse> => {
	return API.post('/auth/login', data);
};
export const logout = async () => API.get('/auth/logout');

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

export const getUser = async (): Promise<User> => {
	return API.get('/user');
};

export const getSessions = async (): Promise<Session[]> => {
	return API.get('/sessions');
};

export const deleteSession = async (id: string): Promise<void> => {
	return API.delete(`/sessions/${id}`);
};

export const getLists = async (): Promise<List[]> => {
	return API.get('/lists');
};

export const getList = async (id: string): Promise<List> => {
	return API.get(`/lists/${id}`);
};

export const createList = async (data: { name: string }): Promise<List> => {
	return API.post('/lists', data);
};

export const updateList = async (
	id: string,
	updates: Partial<{ name: string }>
): Promise<List> => {
	return API.put(`/lists/${id}`, updates);
};

export const deleteList = async (id: string): Promise<void> => {
	return API.delete(`/lists/${id}`);
};
