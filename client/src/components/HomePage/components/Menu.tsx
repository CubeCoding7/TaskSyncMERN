import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import { useState } from 'react';

interface MenuProps {
	isVisible: boolean;
	onClose: () => void;
}

const Dropdown = ({ isVisible, onClose }: MenuProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<nav className={isVisible ? styles.overlay : styles.nav} onClick={onClose}>
			<Link to="/features" className={styles.navButton}>
				Features
			</Link>
			<Link to="/download" className={styles.navButton}>
				Download
			</Link>
			<Link to="/help" className={styles.navButton}>
				Help
			</Link>
			<div className={styles.headerDivider}></div>
			<Link to="/login" className={styles.navButton}>
				Log in
			</Link>
			<Link
				to="/register"
				className={isHovered ? styles.signUpButtonHover : styles.signUpButton}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				Sign up for free
			</Link>
		</nav>
	);
};

export default Dropdown;
