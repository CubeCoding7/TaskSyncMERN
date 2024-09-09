import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../../api/task';
import { Task } from '../../types';

const useUpdateTask = () => {
	return useMutation<
		Task,
		Error,
		{ id: number; updates: Partial<{ name?: string; completed?: boolean }> }
	>({
		mutationFn: ({ id, updates }) => updateTask(id, updates),
		onSuccess: (data) => {
			console.log('Task updated successfully:', data);
		},
		onError: (error) => {
			console.error('Error updating task:', error);
		},
	});
};

export default useUpdateTask;
