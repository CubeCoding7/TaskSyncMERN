import React, { useEffect, useState } from 'react';
import styles from './TaskInWidget.module.css';
import { toggleTaskCompletion } from '../../../lib/taskUtils';
import type { Task as TaskType } from '../../../lib/types';
import Checkbox from '../../TaskPage/components/Checkbox';

interface TaskProps {
	task: TaskType;
	onTaskUpdate: (task: TaskType) => void;
}

const TaskInWidget: React.FC<TaskProps> = ({ task, onTaskUpdate }) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(task.completed);
	}, [task.completed]);

	const formatDate = (date: Date | string) => {
		const d = new Date(date);

		const timezoneOffset = d.getTimezoneOffset() * 60000;
		const localDate = new Date(d.getTime() + timezoneOffset);
		return localDate.toLocaleDateString();
	};

	const handleCheckboxChange = async (checked: boolean) => {
		setIsChecked(checked);
		try {
			const updatedTask = await toggleTaskCompletion(task._id);
			onTaskUpdate(updatedTask);
		} catch (error) {
			console.error('Error updating task completion:', error);
		}
	};
	return (
		<div className={styles.task}>
			<Checkbox checked={isChecked} onChange={handleCheckboxChange} />
			<p>{task.name}</p>
			<p className={styles.dueDate}>
				{task.dueDate ? formatDate(task.dueDate) : ''}
			</p>
		</div>
	);
};

export default TaskInWidget;
