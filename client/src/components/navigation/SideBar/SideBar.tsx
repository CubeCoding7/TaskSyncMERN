import React from 'react';
import {
	faHome,
	faTasks,
	faCalendarDays,
	faStickyNote,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './SideBar.module.css';
import SideBarButton from './SideBarButton';

const Sidebar: React.FC = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.iconSection}>
				<SideBarButton href="/app/home" icon={faHome} activeLink="/app/home" />
				<SideBarButton
					href="/app/tasks/inbox"
					icon={faTasks}
					activeLink="/app/tasks"
				/>
				<SideBarButton
					href="/app/calendar"
					icon={faCalendarDays}
					activeLink="/app/calendar"
				/>
				<SideBarButton
					href="/app/notes"
					icon={faStickyNote}
					activeLink="/app/notes"
				/>
			</div>
		</div>
	);
};

export default Sidebar;
