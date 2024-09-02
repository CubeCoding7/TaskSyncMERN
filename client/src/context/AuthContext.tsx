import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../lib/api';

export interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
