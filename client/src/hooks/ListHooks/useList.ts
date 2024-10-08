import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getList } from '../../api/list';
import { List } from '../../types';

const useList = (
	id: string,
	opts = {}
): UseQueryResult<List> & { list: List | undefined } => {
	const queryResult = useQuery<List>({
		queryKey: ['list', id],
		queryFn: () => getList(id),
		enabled: !!id,
		...opts,
	});

	return {
		...queryResult,
		list: queryResult.data,
	};
};

export default useList;
