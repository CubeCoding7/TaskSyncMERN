import { Task } from './types';

export const toggleTaskCompletion = async (taskId: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/tasks/${taskId}/complete`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to update task completion status: ${errorText}`);
		}

		return response.json();
	} catch (error) {
		console.error('Error in toggleTaskCompletion:', error);
		throw error; // Re-throw the error to be caught by the caller
	}
};

export const sortTasks = (tasks: Task[], category: string) => {
	return tasks
		.filter((task) => {
			if (category === 'completed') {
				return task.completed;
			}
			if (category === 'all') {
				return true;
			}
			if (category === 'today' && !task.completed) {
				let dueDateStr: string;

				if (task.dueDate instanceof Date) {
					dueDateStr = task.dueDate.toISOString().split('T')[0];
				} else if (typeof task.dueDate === 'string') {
					dueDateStr = task.dueDate.split('T')[0];
				} else {
					return false;
				}
				const today = new Date().toISOString().split('T')[0];
				return dueDateStr === today;
			}
			return task.category === category && !task.completed;
		})
		.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
};
