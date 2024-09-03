import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLists } from '../../lib/api';
import { List } from '../../lib/types';

export const LISTS = 'lists';

const useLists = (opts = {}): UseQueryResult<List[]> & { lists: List[] } => {
	const queryResult = useQuery<List[]>({
		queryKey: [LISTS],
		queryFn: getLists,
		...opts,
	});

	return {
		...queryResult,
		lists: queryResult.data || [],
	};
};

export default useLists;
