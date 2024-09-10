import API from '../config/apiClient';
import { User, Settings } from '../types';

// User Functions
export const getUser = async (): Promise<User> => {
	return API.get('/user');
};

export const updateUserSettings = async (settings: Settings): Promise<void> => {
	return API.put('/user/settings', { settings });
};
