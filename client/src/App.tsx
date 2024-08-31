import { Routes, Route } from 'react-router-dom';

// pages
import HomeLayout from './HomeLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppPage from './pages/AppPage';
import AppLayout from './AppLayout';
import PlaceholderPage from './pages/PlaceHolderPage';
import TaskPage from './pages/TaskPage';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

function App() {
	// const { user } = useAuthContext();

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomeLayout />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/features" element={<LoginPage />} />
					<Route path="/download" element={<PlaceholderPage />} />
					<Route path="/help" element={<PlaceholderPage />} />
					<Route path="/password/forgot" element={<ForgotPassword />} />
					<Route path="/email/verify/:code" element={<VerifyEmail />} />
				</Route>
				<Route element={<AppLayout />}>
					<Route path="/app/home" element={<AppPage />} />
					<Route path="/app/tasks" element={<TaskPage />} />
					<Route path="/app/calendar" element={<PlaceholderPage />} />
					<Route path="/app/notes" element={<PlaceholderPage />} />
					<Route path="/app/settings" element={<PlaceholderPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
