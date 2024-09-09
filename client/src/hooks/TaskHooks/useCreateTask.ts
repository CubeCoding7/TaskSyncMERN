import { useMutation } from '@tanstack/react-query';
import { createTask } from '../../api/task';
import { Task } from '../../types';

const useCreateTask = () => {
	return useMutation<Task, Error, { name: string }>({
		mutationFn: (data) => createTask(data),
		onSuccess: (data) => {
			console.log('Task created successfully:', data);
		},
		onError: (error) => {
			console.error('Error creating task:', error);
		},
	});
};

export default useCreateTask;
