import { useMutation } from '@tanstack/react-query';
import { createList } from '../../api/list';
import { List } from '../../types';

const useCreateList = () => {
	return useMutation<List, Error, { name: string }>({
		mutationFn: (data) => createList(data),
		onSuccess: (data) => {
			console.log('List created successfully:', data);
		},
		onError: (error) => {
			console.error('Error creating list:', error);
		},
	});
};

export default useCreateList;
