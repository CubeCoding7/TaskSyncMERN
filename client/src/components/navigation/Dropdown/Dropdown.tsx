import { Link, useNavigate } from 'react-router-dom';
import styles from './Dropdown.module.css';
import queryClient from '../../../config/queryClient';
import { logout } from '../../../api/auth';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { useSettings } from '../../../hooks/useSettings';

// import { useState } from 'react';

interface DropdownProps {
	isVisible: boolean;
	onClose: () => void;
}

const Dropdown = ({ isVisible, onClose }: DropdownProps) => {
	const { showSettings } = useSettings();

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

	// const setVisible = () => {};

	if (!isVisible) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={`${styles.dropdownContent}`}>
				<div
					className={styles.accountSection}
					onClick={(e) => e.stopPropagation()}
				>
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
					<Link to="/login">Switch Accounts</Link>
					<Link to="">Manage Account</Link>
				</div>
				<div className={styles.sectionDivider}></div>
				<div>
					<button
						onClick={() => {
							showSettings('account');
						}}
						className={styles.navLink}
					>
						Profile
					</button>
					<button
						onClick={() => {
							showSettings('appearance');
						}}
						className={styles.navLink}
					>
						Appearance
					</button>
					<Link to="/app/home">Placeholder</Link>
					<Link to="/app/home">Placeholder</Link>
					<Link to="/app/home">Placeholder</Link>
					<div className={styles.sectionDivider}></div>

					<Link to="/app">Device theme</Link>
				</div>
				<div className={styles.sectionDivider}></div>
				<div>
					<Link to="/download">Download the app</Link>
					<button onClick={handleSignOut} className={styles.navLink}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
