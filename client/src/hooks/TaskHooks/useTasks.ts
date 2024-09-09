import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTasks } from '../../api/task';
import { Task } from '../../types';

export const LISTS = 'tasks';

const useTasks = (opts = {}): UseQueryResult<Task[]> & { tasks: Task[] } => {
	const queryResult = useQuery<Task[]>({
		queryKey: [LISTS],
		queryFn: getTasks,
		...opts,
	});

	return {
		...queryResult,
		tasks: queryResult.data || [],
	};
};

export default useTasks;
