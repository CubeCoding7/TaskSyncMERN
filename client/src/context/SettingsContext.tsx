import React, { createContext, useState, ReactNode } from 'react';

export interface SettingsContextType {
	isVisible: boolean;
	showSettings: (tab: string) => void;
	hideSettings: () => void;
	tab: string;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
);

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
