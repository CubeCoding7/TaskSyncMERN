import { useEffect, useState } from 'react';
import TaskNav from '../../components/TaskPage/TaskNav';
import styles from './TaskPage.module.css';
import Task from '../../components/TaskPage/components/Task';
import NewTaskForm from '../../components/TaskPage/NewTaskForm';
import { useTasksContext } from '../../hooks/useTasksContext';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import useList from '../../hooks/ListHooks/useList';

function TaskPage() {
	const [isVisible, setVisibility] = useState(false);
	const { listId } = useParams<{ listId: string }>();

	const { state, dispatch } = useTasksContext();
	const toggleVisibility = () => setVisibility((prev) => !prev);
	const { list, isLoading, isError, error } = useList(listId || '');
	const { user } = useAuth();

	useEffect(() => {
		const fetchTasks = async () => {
			if (!user) {
				console.error('User is not authenticated');
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
					method: 'GET',
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error('Failed to fetch tasks');
				}

				const json = await response.json();
				dispatch({ type: 'SET_TASKS', payload: json });
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
			}
		};

		fetchTasks();
	}, [dispatch, user]);

	const handleTaskUpdate = (updatedTask: Task) => {
		dispatch({
			type: 'UPDATE_TASK',
			payload: updatedTask,
		});
	};

	if (isLoading) {
		return (
			<div className={styles.taskPage}>
				<TaskNav toggleVisibility={toggleVisibility} />
				<div className={styles.tasksContent}>
					<div>Loading...</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={styles.taskPage}>
				<TaskNav toggleVisibility={toggleVisibility} />
				<div className={styles.tasksContent}>
					<div>Error: {error?.message}</div>
				</div>
			</div>
		);
	}

	if (!list) {
		return (
			<div className={styles.taskPage}>
				<TaskNav toggleVisibility={toggleVisibility} />
				<div className={styles.tasksContent}>
					<div>No list found.</div>
				</div>
			</div>
		);
	}

	// Sort tasks: completed tasks at the bottom
	const sortedTasks = Array.isArray(state.tasks)
		? state.tasks
				.filter((task) => {
					if (list.category === 'completed') {
						return task.completed;
					}
					if (list.category === 'all') {
						return true;
					}
					return task.category === list.category && !task.completed;
				})
				.sort((a, b) =>
					a.completed === b.completed ? 0 : a.completed ? 1 : -1
				)
		: [];

	return (
		<div className={styles.taskPage}>
			<TaskNav toggleVisibility={toggleVisibility} />
			<div className={styles.tasksContent}>
				<h2>{list.name}</h2>
				<div className={styles.tasks}>
					{sortedTasks.map((task) => (
						<Task key={task._id} task={task} onTaskUpdate={handleTaskUpdate} />
					))}
				</div>
				{isVisible && <NewTaskForm toggleVisibility={toggleVisibility} />}
			</div>
		</div>
	);
}

export default TaskPage;
