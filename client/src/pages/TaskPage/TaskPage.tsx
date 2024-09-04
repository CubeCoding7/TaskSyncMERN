import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Task from '../../components/TaskPage/components/Task';
import NewTaskForm from '../../components/TaskPage/NewTaskForm';
import { useTasksContext } from '../../hooks/useTasksContext';
import useAuth from '../../hooks/useAuth';
import useFetchTasks from '../../hooks/useTask';
import useList from '../../hooks/ListHooks/useList';
import { sortTasks } from '../../lib/taskUtils';
import TaskPageContent from '../../components/TaskPage/TaskPageContent';
import styles from './TaskPage.module.css';
import { Task as TaskType } from '../../lib/types';

function TaskPage() {
	const [isVisible, setVisibility] = useState(false);
	const { listId } = useParams<{ listId: string }>();

	const { state, dispatch } = useTasksContext();
	const toggleVisibility = () => setVisibility((prev) => !prev);
	const { list, isLoading, isError, error } = useList(listId || '');
	const { user } = useAuth();

	useFetchTasks(user, dispatch);

	const handleTaskUpdate = (updatedTask: TaskType) => {
		dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
	};

	if (isLoading) {
		return (
			<TaskPageContent toggleVisibility={toggleVisibility}>
				<div>Loading...</div>
			</TaskPageContent>
		);
	}

	if (isError) {
		return (
			<TaskPageContent toggleVisibility={toggleVisibility}>
				<div>Error: {error?.message}</div>
			</TaskPageContent>
		);
	}

	if (!list) {
		return (
			<TaskPageContent toggleVisibility={toggleVisibility}>
				<div>No list found.</div>
			</TaskPageContent>
		);
	}

	const sortedTasks = sortTasks(state.tasks, list.category);

	return (
		<TaskPageContent toggleVisibility={toggleVisibility}>
			<h2>{list.name}</h2>
			<div className={styles.tasks}>
				{sortedTasks.map((task) => (
					<Task key={task._id} task={task} onTaskUpdate={handleTaskUpdate} />
				))}
			</div>
			{isVisible && <NewTaskForm toggleVisibility={toggleVisibility} />}
		</TaskPageContent>
	);
}

export default TaskPage;
