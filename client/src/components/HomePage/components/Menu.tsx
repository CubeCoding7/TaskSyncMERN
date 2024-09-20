import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';

interface MenuProps {
	isVisible: boolean;
	onClose: () => void;
}

const Dropdown = ({ isVisible, onClose }: MenuProps) => {
	if (!isVisible) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<Link to="/features" className={styles.nav_button}>
				Features
			</Link>
			<Link to="/download" className={styles.nav_button}>
				Download
			</Link>
			<Link to="/help" className={styles.nav_button}>
				Help
			</Link>
			<div className={styles.headerDivider}></div>
			<Link to="/register" className={styles.sign_up_button}>
				Sign up for free
			</Link>
			<Link to="/login" className={styles.nav_button}>
				Log in
			</Link>
		</div>
	);
};

export default Dropdown;
