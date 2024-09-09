import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Task from '../../components/TaskPage/components/Task';
import NewTaskForm from '../../components/TaskPage/NewTaskForm';
import useList from '../../hooks/ListHooks/useList';
import { sortTasks } from '../../lib/taskUtils';
import TaskPageContent from '../../components/TaskPage/TaskPageContent';
import styles from './TaskPage.module.css';
import useUpdateTask from '../../hooks/TaskHooks/useUpdateTask';
import useTasks from '../../hooks/TaskHooks/useTasks';

function TaskPage() {
	const [isVisible, setVisibility] = useState(false);
	const { listId } = useParams<{ listId: string }>();

	const toggleVisibility = () => setVisibility((prev) => !prev);
	const { list, isLoading, isError, error } = useList(listId || '');
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

	const sortedTasks = sortTasks(tasks, list.category);

	return (
		<TaskPageContent toggleVisibility={toggleVisibility}>
			<h2>{list.name}</h2>
			<div className={styles.tasks}>
				{sortedTasks.map((task) => (
					<Task key={task._id} task={task} onTaskUpdate={handleUpdate} />
				))}
			</div>
			{isVisible && <NewTaskForm toggleVisibility={toggleVisibility} />}
		</TaskPageContent>
	);
}

export default TaskPage;
