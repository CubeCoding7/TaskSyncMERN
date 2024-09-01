import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/navigation/SideBar';
import AppHeader from './components/navigation/AppHeader';
import styles from './AppLayout.module.css';
import useAuth from './hooks/useAuth';

const AppLayout: React.FC = () => {
	const { user, isLoading } = useAuth();

	return isLoading ? (
		<div style={{ margin: '0 auto' }}>
			<div className="spinner"></div>
		</div>
	) : user ? (
		<div className={styles.appContainer}>
			<Sidebar />
			<AppHeader />
			<div className={styles.mainContent}>
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
