import { Outlet } from 'react-router-dom';
import HomeHeader from './components/navigation/HomeHeader';

function HomeLayout() {
	return (
		<div className="App">
			<HomeHeader />
			<div style={{ marginTop: '60px' }}>
				<Outlet />
			</div>
		</div>
	);
}

export default HomeLayout;
