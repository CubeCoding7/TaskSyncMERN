import React, { useEffect, useState } from 'react';
import styles from './TaskInWidget.module.css';
import type { Task as TaskType } from '../../../types';
import Checkbox from '../../TaskPage/components/Checkbox';

interface TaskProps {
	task: TaskType;
	onTaskUpdate: (id: number, updates: { completed?: boolean }) => void;
}

const TaskInWidget: React.FC<TaskProps> = ({ task, onTaskUpdate }) => {
	const [isChecked, setIsChecked] = useState(task.completed);

	useEffect(() => {
		setIsChecked(task.completed);
	}, [task.completed]);

	const formatDate = (date: Date | string) => {
		const d = new Date(date);

		const timezoneOffset = d.getTimezoneOffset() * 60000;
		const localDate = new Date(d.getTime() + timezoneOffset);
		return localDate.toLocaleDateString();
	};

	const handleCheckboxChange = (checked: boolean) => {
		setIsChecked(checked);
		onTaskUpdate(task._id, { completed: checked });
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
