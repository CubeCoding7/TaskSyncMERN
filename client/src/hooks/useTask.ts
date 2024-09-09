// src/hooks/useFetchTasks.ts

import { useEffect } from 'react';
import API from '../config/apiClient';
import { Task, User, Dispatch } from '../types';

interface FetchTasksOptions {
	startDate?: string;
	endDate?: string;
}

const useFetchTasks = (
	user: User | null,
	dispatch: Dispatch,
	options: FetchTasksOptions = {}
) => {
	useEffect(() => {
		const fetchTasks = async () => {
			if (!user) {
				console.error('User is not authenticated');
				return;
			}

			try {
				const { startDate, endDate } = options;
				let url = `${import.meta.env.VITE_API_URL}/tasks`;

				if (startDate && endDate) {
					url += `?startDate=${encodeURIComponent(
						startDate
					)}&endDate=${encodeURIComponent(endDate)}`;
				}

				const response = await API.get<{ tasks: Task[] }>(url);

				const tasks = response;

				if (!Array.isArray(tasks)) {
					throw new Error('Invalid tasks format');
				}

				dispatch({ type: 'SET_TASKS', payload: tasks });
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
			}
		};

		fetchTasks();
	}, [dispatch, user, options.endDate, options.startDate]);
};

export default useFetchTasks;
