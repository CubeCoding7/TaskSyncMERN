import { Routes, Route, useNavigate } from 'react-router-dom';

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
import ResetPassword from './pages/ResetPassword';
import { setNavigate } from './lib/navigation';
import CalendarPage from './pages/CalendarPage';
import Settings from './components/Settings';

function App() {
	const navigate = useNavigate();
	setNavigate(navigate);
	return (
		<div className="App">
			<Settings />

			<Routes>
				<Route path="/" element={<HomeLayout />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/features" element={<PlaceholderPage />} />
					<Route path="/download" element={<PlaceholderPage />} />
					<Route path="/help" element={<PlaceholderPage />} />
					<Route path="/email/verify/:code" element={<VerifyEmail />} />
					<Route path="/password/forgot" element={<ForgotPassword />} />
					<Route path="/password/reset" element={<ResetPassword />} />
				</Route>
				<Route element={<AppLayout />}>
					<Route path="/app/home" element={<AppPage />} />
					<Route path="/app/tasks/:listId" element={<TaskPage />} />
					<Route path="/app/calendar" element={<CalendarPage />} />
					<Route path="/app/notes" element={<PlaceholderPage />} />
					<Route path="/app/account/settings" element={<PlaceholderPage />} />
					<Route path="/app/account/profile" element={<PlaceholderPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
