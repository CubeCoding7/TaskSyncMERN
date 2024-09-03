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

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error?.message}</div>;
	}

	if (!list) {
		return <div>No list found.</div>;
	}

	return (
		<div className={styles.taskPage}>
			<TaskNav toggleVisibility={toggleVisibility} />
			<div className={styles.tasksContent}>
				<h2>{}</h2>
				<div className={styles.tasks}>
					{Array.isArray(state.tasks) &&
						state.tasks
							.filter((task) => {
								return task.category === list.category;
							})
							.map((task) => <Task key={task._id} task={task} />)}
				</div>
				{isVisible && <NewTaskForm toggleVisibility={toggleVisibility} />}
			</div>
		</div>
	);
}

export default TaskPage;
