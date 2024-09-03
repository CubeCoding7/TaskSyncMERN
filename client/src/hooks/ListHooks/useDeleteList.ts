import { useMutation } from '@tanstack/react-query';
import { deleteList } from '../../lib/api';

const useDeleteList = () => {
	return useMutation<void, Error, string>({
		mutationFn: (id) => deleteList(id),
		onSuccess: () => {
			console.log('List deleted successfully');
		},
		onError: (error) => {
			console.error('Error deleting list:', error);
		},
	});
};

export default useDeleteList;
