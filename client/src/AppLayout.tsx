import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/navigation/SideBar';
import AppHeader from './components/navigation/AppHeader';
import styles from './AppLayout.module.css';
import useAuth from './hooks/useAuth';
import { useIsPathExcluded } from './lib/pathUtils';

const AppLayout: React.FC = () => {
	const { user, isLoading } = useAuth();

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
