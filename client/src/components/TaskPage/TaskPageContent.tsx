import React from 'react';
import TaskNav from './TaskNav';
import styles from '../../pages/TaskPage/TaskPage.module.css';

type TaskPageContentProps = {
	children: React.ReactNode;
	toggleVisibility: () => void;
};

const TaskPageContent: React.FC<TaskPageContentProps> = ({
	children,
	toggleVisibility,
}) => {
	return (
		<div className={styles.taskPage}>
			<TaskNav toggleVisibility={toggleVisibility} />
			<div className={styles.tasksContent}>{children}</div>
		</div>
	);
};

export default TaskPageContent;
