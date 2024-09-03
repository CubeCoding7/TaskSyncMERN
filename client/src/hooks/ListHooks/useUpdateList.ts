import { useMutation } from '@tanstack/react-query';
import { updateList } from '../../lib/api';
import { List } from '../../lib/types';

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
