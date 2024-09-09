import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './Widget.module.css';
import { Task as TaskType } from '../types';
import TaskInWidget from './AppPage/components/TaskInWidget';
import useTasks from '../hooks/TaskHooks/useTasks';
import useUpdateTask from '../hooks/TaskHooks/useUpdateTask';

interface Props {
	name: string;
	icon: IconProp;
}

const Widget = ({ name, icon }: Props) => {
	const { tasks } = useTasks();
	const { mutate: updateTask } = useUpdateTask();

	const handleUpdate = (id: number, updates: { completed?: boolean }) => {
		updateTask({ id, updates });
	};

	const sortTasks = (tasks: TaskType[]) => {
		const today = new Date().toISOString().split('T')[0];

		return tasks
			.filter((task) => {
				if (task.completed) return false;

				if (task.dueDate == null) return false;

				let dueDateStr: string;

				if (task.dueDate instanceof Date) {
					dueDateStr = task.dueDate.toISOString().split('T')[0];
				} else {
					return false;
				}

				return dueDateStr === today;
			})
			.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
	};

	const sortedTasks = sortTasks(tasks);
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
