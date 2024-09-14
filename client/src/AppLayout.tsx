import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/navigation/SideBar';
import AppHeader from './components/navigation/AppHeader';
import styles from './AppLayout.module.css';
import useAuth from './hooks/useAuth';
import { useIsPathExcluded } from './lib/pathUtils';
import { parseColor, rgbaToRgb } from './lib/colorUtils';

const AppLayout: React.FC = () => {
	const { user, isLoading } = useAuth();

	if (user) {
		document.documentElement.style.setProperty(
			'--first-color',
			user.settings.color1 || '0, 4, 255'
		);
		const colorStr = user.settings.color1 || '0, 4, 255';
		const opacity = 0.6;
		const { r, g, b } = parseColor(colorStr);
		document.documentElement.style.setProperty(
			'--header-color',
			rgbaToRgb(r, g, b, opacity)
		);
		document.documentElement.style.setProperty(
			'--second-color',
			user.settings.color2 || '0, 199, 123'
		);
	}

	const isExcluded = useIsPathExcluded();

	return isLoading ? (
		<div style={{ margin: '0 auto' }}>
			<div className="spinner"></div>
		</div>
	) : user ? (
		<div className={styles.appContainer}>
			{!isExcluded && <Sidebar />}
			<AppHeader />
			<div
				className={styles.mainContent}
				style={{
					marginLeft: isExcluded ? '0px' : '80px',
				}}
			>
				<div className={styles.background}></div>

				<Outlet />
			</div>
		</div>
	) : (
		<Navigate
			to="/login"
			replace
			state={{
				redirectUrl: window.location.pathname,
			}}
		/>
	);
};

export default AppLayout;
