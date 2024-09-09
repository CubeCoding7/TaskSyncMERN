import { useMutation } from '@tanstack/react-query';
import { updateList } from '../../api/list';
import { List } from '../../types';

const useUpdateList = () => {
	return useMutation<
		List,
		Error,
		{ id: string; updates: Partial<{ name: string }> }
	>({
		mutationFn: ({ id, updates }) => updateList(id, updates),
		onSuccess: (data) => {
			console.log('List updated successfully:', data);
		},
		onError: (error) => {
			console.error('Error updating list:', error);
		},
	});
};

export default useUpdateList;
