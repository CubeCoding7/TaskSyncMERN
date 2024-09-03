import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faFolderPlus,
	faInbox,
	faRectangleHistoryCirclePlus,
	faCheck,
	faCalendarStar,
	faCalendarClock,
	faCalendarImage,
	faSquareCheck,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './TaskNav.module.css';
import List from './components/List';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useLists from '../../hooks/ListHooks/useLists';

interface Props {
	toggleVisibility: () => void;
}

const TaskNav = ({ toggleVisibility }: Props) => {
	const { lists } = useLists();

	const categories: { name: string; icon: IconProp; category: string }[] = [
		{ name: 'Inbox', icon: faInbox, category: 'inbox' },
		{ name: 'All', icon: faCheck, category: 'all' },
		{ name: 'Today', icon: faCalendarStar, category: 'today' },
		{ name: 'Scheduled', icon: faCalendarClock, category: 'scheduled' },
		{ name: 'One Day', icon: faCalendarImage, category: 'one_day' },
		{ name: 'Completed', icon: faSquareCheck, category: 'completed' },
	];

	return (
		<div className={styles.tasksNav}>
			<ul className={styles.wrapper}>
				<div className={styles.topBarWrapper}>
					<ul className={styles.topBar}>
						<li>
							<button className={styles.button} onClick={toggleVisibility}>
								<FontAwesomeIcon className={styles.icon} icon={faPlus} />
							</button>
						</li>
						<li>
							<button className={styles.button}>
								<FontAwesomeIcon className={styles.icon} icon={faFolderPlus} />
							</button>
						</li>
						<li>
							<button className={styles.button} aria-label="Add History">
								<FontAwesomeIcon
									className={styles.icon}
									icon={faRectangleHistoryCirclePlus}
								/>
							</button>
						</li>
					</ul>
				</div>
				<div className={styles.listWrapper}>
					{/* Render predefined categories */}
					{categories.map((item) => (
						<List
							key={item.category}
							name={item.name}
							icon={item.icon}
							category={item.category}
						/>
					))}
					<div className={styles.userLists}>
						{/* Render user-created lists */}
						{lists.map((list) => (
							<List
								key={list._id}
								name={list.name}
								icon={faCheck}
								category={list._id}
							/>
						))}
					</div>
				</div>
			</ul>
		</div>
	);
};

export default TaskNav;
