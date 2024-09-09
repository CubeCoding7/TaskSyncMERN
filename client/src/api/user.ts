import API from '../config/apiClient';
import { User } from '../types';

// User Functions
export const getUser = async (): Promise<User> => {
	return API.get('/user');
};
