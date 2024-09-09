import API from '../config/apiClient';

// Session Interface
interface Session {
	id: string;
	createdAt: string;
	expiresAt: string;
}

// Session Management Functions
export const getSessions = async (): Promise<Session[]> => {
	return API.get('/sessions');
};

export const deleteSession = async (id: string): Promise<void> => {
	return API.delete(`/sessions/${id}`);
};
