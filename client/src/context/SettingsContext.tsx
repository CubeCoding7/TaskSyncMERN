import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
	isVisible: boolean;
	showSettings: (tab: string) => void;
	hideSettings: () => void;
	tab: string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
);

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return context;
};

interface SettingsProviderProps {
	children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
	children,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [tab, setTab] = useState('account');

	const showSettings = (selectedTab: string) => {
		setTab(selectedTab);
		setIsVisible(true);
	};

	const hideSettings = () => {
		setIsVisible(false);
	};

	return (
		<SettingsContext.Provider
			value={{ isVisible, showSettings, hideSettings, tab }}
		>
			{children}
		</SettingsContext.Provider>
	);
};
