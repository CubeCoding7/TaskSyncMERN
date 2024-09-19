import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

function HomeHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src="/img/logo.svg" alt="" />
			</div>
			<div className={styles.title}>
				<Link to="/">TaskSync</Link>
			</div>
			<button className={styles.hamburger} onClick={toggleMobileMenu}>
				<FontAwesomeIcon icon={faBars} />
			</button>
			<nav>
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
			</nav>
		</header>
	);
}

export default HomeHeader;
