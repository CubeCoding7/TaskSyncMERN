import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTask } from '../../api/task';
import { Task } from '../../types';

const useTask = (
	id: string,
	opts = {}
): UseQueryResult<Task> & { task: Task | undefined } => {
	const queryResult = useQuery<Task>({
		queryKey: ['task', id],
		queryFn: () => getTask(id),
		enabled: !!id,
		...opts,
	});

	return {
		...queryResult,
		task: queryResult.data,
	};
};

export default useTask;
