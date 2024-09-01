import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUser, User } from '../lib/api';

export const AUTH = 'auth';

const useAuth = (
	opts = {}
): UseQueryResult<User> & { user: User | undefined } => {
	const queryResult = useQuery<User>({
		queryKey: [AUTH],
		queryFn: getUser,
		staleTime: Infinity,
		...opts,
	});

	return {
		...queryResult,
		user: queryResult.data,
	};
};

export default useAuth;
