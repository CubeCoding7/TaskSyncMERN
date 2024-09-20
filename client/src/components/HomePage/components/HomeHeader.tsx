import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-solid-svg-icons';
import { useState } from 'react';
import Menu from './Menu';

function HomeHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

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
			<nav className={`${styles.nav}`}>
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
				<Link to="/login" className={styles.nav_button}>
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
			<Menu isVisible={isMobileMenuOpen} onClose={toggleMobileMenu}></Menu>
		</header>
	);
}

export default HomeHeader;
