import { Link } from 'react-router-dom';
import styles from './HomeHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-solid-svg-icons';
import { useEffect, useState } from 'react';
import Menu from './Menu';

function HomeHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 865) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
			<Menu isVisible={isMobileMenuOpen} onClose={toggleMobileMenu}></Menu>
		</header>
	);
}

export default HomeHeader;
