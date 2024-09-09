import API from '../config/apiClient';
import { Task } from '../types';

// Task Management Functions
export const getTasks = async (): Promise<Task[]> => {
	return API.get('/tasks');
};

export const getTask = async (id: string): Promise<Task> => {
	return API.get(`/tasks/${id}`);
};

export const createTask = async (data: { name: string }): Promise<Task> => {
	return API.post('/tasks', data);
};

export const updateTask = async (
	id: number,
	updates: Partial<{ name?: string; completed?: boolean }>
): Promise<Task> => {
	return API.put(`/tasks/${id}`, updates);
};

export const deleteTask = async (id: string): Promise<void> => {
	return API.delete(`/tasks/${id}`);
};
