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
import { useSettings } from '../../hooks/useSettings';

function AppHeader() {
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const { showSettings } = useSettings();

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
				left: isExcluded ? '0px' : '82px',
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
					onClick={() => showSettings('account')}
					className={styles.navLink}
				>
					<FontAwesomeIcon icon={faGear} />
				</button>

				<div className={styles.profileDropdown}>
					<button onClick={handleCollapseDropdown} className={styles.navLink}>
						<FontAwesomeIcon icon={faUser} />
					</button>
					<Dropdown
						isVisible={isDropdownVisible}
						onClose={() => setDropdownVisible(false)}
					/>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;
