import { Link, useNavigate } from 'react-router-dom';
import styles from './Dropdown.module.css';
import queryClient from '../../../config/queryClient';
import { logout } from '../../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

interface DropdownProps {
	isVisible: boolean;
}

const Dropdown = ({ isVisible }: DropdownProps) => {
	const { user } = useAuth();
	const email = user?.email;
	const username = user?.username;
	const navigate = useNavigate();

	const { mutate: signOut } = useMutation({
		mutationFn: logout,
		onSettled: () => {
			queryClient.clear();
			navigate('/login', { replace: true });
		},
	});

	const handleSignOut = () => {
		signOut();
	};

	return (
		<div
			className={`${styles.dropdownContent} ${isVisible ? styles.show : ''}`}
		>
			<div className={styles.accountSection}>
				<div className={styles.profile}>
					<img src="/img/logo.svg" alt="" />
					<div className={styles.profileDetails}>
						<span>
							{username}
							{/* <%= user.firstName + ' ' + user.lastName %> */}
						</span>
						<span>{email}</span>
					</div>
				</div>
				<Link to="">Switch Accounts</Link>
				<Link to="">Manage Account</Link>
			</div>
			<div className={styles.sectionDivider}></div>
			<div>
				<Link to="/app/account/profile">Profile and Appearance</Link>
				<Link to="/app/account/settings">Settings</Link>
				<Link to="/app">Device theme</Link>
				<Link to="/app">Placeholder</Link>
				<Link to="/app">Placeholder</Link>
				<Link to="/app">Placeholder</Link>
			</div>
			<div className={styles.sectionDivider}></div>
			<div>
				<Link to="/download">Download the app</Link>
				<button onClick={handleSignOut}>Logout</button>
			</div>
		</div>
	);
};

export default Dropdown;
