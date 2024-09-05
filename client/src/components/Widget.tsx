import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import styles from './Widget.module.css';
// import { sortTasks } from '../lib/taskUtils';
import { useTasksContext } from '../hooks/useTasksContext';
import { Task as TaskType } from '../lib/types';
// import useList from '../hooks/ListHooks/useList';
import useFetchTasks from '../hooks/useTask';
import useAuth from '../hooks/useAuth';
import TaskInWidget from './AppPage/components/TaskInWidget';

interface Props {
	name: string;
	icon: IconProp;
}

const Widget = ({ name, icon }: Props) => {
	const { state, dispatch } = useTasksContext();
	const { user } = useAuth();

	useFetchTasks(user, dispatch);

	const handleTaskUpdate = (updatedTask: TaskType) => {
		dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
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
				} else if (typeof task.dueDate === 'string') {
					dueDateStr = task.dueDate.split('T')[0];
				} else {
					return false;
				}

				return dueDateStr === today;
			})
			.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
	};

	const sortedTasks = sortTasks(state.tasks);
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
										onTaskUpdate={handleTaskUpdate}
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
										onTaskUpdate={handleTaskUpdate}
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
