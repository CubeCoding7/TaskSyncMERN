import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext'; // Adjust the path as needed

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
};
