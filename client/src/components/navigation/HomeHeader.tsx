import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
// import useAuth from '../../hooks/useAuth';

function HomeHeader() {
	// const { user } = useAuth();

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src="/img/logo.svg" alt="" />
			</div>
			<div className={styles.title}>
				<Link to="/">TaskSync</Link>
			</div>
			<nav>
				<Link to="/register" className={styles.sign_up_button}>
					Sign up for free
				</Link>
				<Link to="/login" className={styles.nav_button}>
					Log in
				</Link>
				<div className={styles.headerDivider}></div>
				<Link to="/help" className={styles.nav_button}>
					Help
				</Link>
				<Link to="/download" className={styles.nav_button}>
					Download
				</Link>
				<Link to="/features" className={styles.nav_button}>
					Features
				</Link>
			</nav>
		</header>
	);
}

export default HomeHeader;
