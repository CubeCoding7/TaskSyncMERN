// src/hooks/useFetchTasks.ts

import { useEffect } from 'react';
import API from '../config/apiClient';
import { Task, User, Dispatch } from '../lib/types'; // Adjust the path as needed

const useFetchTasks = (user: User | null, dispatch: Dispatch) => {
	useEffect(() => {
		const fetchTasks = async () => {
			if (!user) {
				console.error('User is not authenticated');
				return;
			}

			try {
				const response = await API.get<{ tasks: Task[] }>(
					`${import.meta.env.VITE_API_URL}/tasks`
				);

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
	}, [dispatch, user]);
};

export default useFetchTasks;
