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
import Settings from '../Settings';

function AppHeader() {
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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
				<button
					onClick={() => setIsSettingsVisible(true)}
					className={styles.navLink}
				>
					<FontAwesomeIcon icon={faGear} />
				</button>
				<Settings
					isVisible={isSettingsVisible}
					onClose={() => setIsSettingsVisible(false)}
				/>
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
