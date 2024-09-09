import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../api/task';

const useDeleteTask = () => {
	return useMutation<void, Error, string>({
		mutationFn: (id) => deleteTask(id),
		onSuccess: () => {
			console.log('Task deleted successfully');
		},
		onError: (error) => {
			console.error('Error deleting task:', error);
		},
	});
};

export default useDeleteTask;
