import React, { useState } from 'react';
import styles from './Task.module.css';
import Checkbox from './Checkbox';
import { formatDate } from '../../../lib/taskUtils';
import type { Task as TaskType } from '../../../types';

interface TaskProps {
	task: TaskType;
	onTaskUpdate: (
		id: number,
		updates: { name?: string; completed?: boolean }
	) => void;
}

const Task: React.FC<TaskProps> = ({ task, onTaskUpdate }) => {
	const [isChecked, setIsChecked] = useState(task.completed);

	const handleCheckboxChange = (checked: boolean) => {
		setIsChecked(checked);
		onTaskUpdate(task._id, { completed: checked });
	};

	return (
		<div className={styles.task}>
			<Checkbox checked={isChecked} onChange={handleCheckboxChange} />
			<p>{task.name}</p>
			<p className={styles.dueDate}>{formatDate(task.dueDate)}</p>
		</div>
	);
};

export default Task;
