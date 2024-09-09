import API from '../config/apiClient';
import { List } from '../types';

// List Management Functions
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
