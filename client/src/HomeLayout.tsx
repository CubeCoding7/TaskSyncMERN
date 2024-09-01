import { Navigate, Outlet } from 'react-router-dom';
import HomeHeader from './components/navigation/HomeHeader';
import useAuth from './hooks/useAuth';

function HomeLayout() {
	const { user, isLoading } = useAuth();

	return isLoading ? (
		<div style={{ margin: '0 auto' }}>
			<div className="spinner"></div>
		</div>
	) : user ? (
		<Navigate to="/app/home" replace />
	) : (
		<div className="App">
			<HomeHeader />
			<div style={{ marginTop: '60px' }}>
				<Outlet />
			</div>
		</div>
	);
}

export default HomeLayout;
