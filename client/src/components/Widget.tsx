import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './Widget.module.css';
import TaskInWidget from './AppPage/components/TaskInWidget';
import useTasks from '../hooks/TaskHooks/useTasks';
import useUpdateTask from '../hooks/TaskHooks/useUpdateTask';
import { sortTasks } from '../lib/taskUtils';

interface Props {
	name: string;
	icon: IconProp;
}

const Widget = ({ name, icon }: Props) => {
	const { tasks, refetch } = useTasks();
	const { mutate: updateTask } = useUpdateTask();
	

	const handleUpdate = (id: number, updates: { completed?: boolean }) => {
		updateTask(
			{ id, updates },
			{
				onSuccess: () => {
					refetch();
				},
			}
		);
	};

	const sortedTasks = sortTasks(tasks, 'today');
	return (
		<div className={styles.widget}>
			<div className={styles.widgetHead}>
				<ul>
					<li>
						<FontAwesomeIcon
							icon={icon}
							className={`${styles.icon} ${styles.titleIcon}`}
						/>
					</li>
					<li className={styles.widgetTitle}>{name} - Today</li>
					<li className={styles.chevron}>
						<FontAwesomeIcon icon={faChevronLeft} className={styles.left} />
					</li>
					<li className={styles.chevron}>
						<FontAwesomeIcon icon={faChevronRight} />
					</li>
				</ul>
			</div>
			<div className={styles.widgetBody}>
				{name === 'Tasks' ? (
					<div className={styles.taskColumns}>
						<div className={styles.column}>
							{sortedTasks
								.slice(0, Math.ceil(sortedTasks.length / 2))
								.map((task) => (
									<TaskInWidget
										key={task._id}
										task={task}
										onTaskUpdate={handleUpdate}
									/>
								))}
						</div>
						<div className={styles.divider}></div>{' '}
						<div className={styles.column}>
							{sortedTasks
								.slice(Math.ceil(sortedTasks.length / 2))
								.map((task) => (
									<TaskInWidget
										key={task._id}
										task={task}
										onTaskUpdate={handleUpdate}
									/>
								))}
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Widget;
