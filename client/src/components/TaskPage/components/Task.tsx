import React, { useEffect, useState } from 'react';
import styles from './Task.module.css';
import Checkbox from './Checkbox';
import { toggleTaskCompletion } from '../../../lib/taskUtils';

interface Task {
	_id: string;
	name: string;
	description: string;
	dueDate: Date;
	createdAt: string;
	completed: boolean;
}

interface TaskProps {
	task: Task;
}

const Task: React.FC<TaskProps> = ({ task }) => {
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

	const handleCheckboxChange = (checked: boolean) => {
		setIsChecked(checked);
		toggleTaskCompletion(task._id);
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

export default Task;
