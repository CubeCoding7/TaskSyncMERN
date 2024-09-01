import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars,
	faGear,
	faSearch,
	faUser,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './AppHeader.module.css';
import Dropdown from './Dropdown/Dropdown';
import { useState } from 'react';
import { useIsPathExcluded } from '../../lib/pathUtils';

function AppHeader() {
	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleCollapseClick = () => {
		// Script to collapse/uncollapse the sidebar
	};

	const handleCollapseDropdown = () => {
		setDropdownVisible(!isDropdownVisible);
	};

	const isExcluded = useIsPathExcluded();

	return (
		<header
			className={styles.header}
			style={{
				left: isExcluded ? '0px' : '82px', // Adjust for sidebar offset
			}}
		>
			<div className={styles.headerLeft}>
				{!isExcluded && (
					<button onClick={handleCollapseClick} className={styles.navLink}>
						<FontAwesomeIcon icon={faBars} />
					</button>
				)}
				<Link to="/app/home" className={styles.headerTitle}>
					TaskSync
				</Link>
			</div>

			<div className={styles.headerCenter}>
				<div className={styles.searchBar}>
					<input type="text" placeholder="Search..." />
					<button>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</div>

			<div className={styles.headerRight}>
				<Link to="/app/account/settings" className={styles.navLink}>
					<FontAwesomeIcon icon={faGear} />
				</Link>
				<div className={styles.profileDropdown}>
					<button onClick={handleCollapseDropdown} className={styles.navLink}>
						<FontAwesomeIcon icon={faUser} />
					</button>
					<Dropdown isVisible={isDropdownVisible} />
				</div>
			</div>
		</header>
	);
}

export default AppHeader;
