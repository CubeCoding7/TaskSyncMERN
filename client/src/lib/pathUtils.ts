import { useLocation } from 'react-router-dom';

const excludedPaths: string[] = ['/app/account'];

export function useIsPathExcluded(): boolean {
	const location = useLocation();
	return excludedPaths.some((path) => location.pathname.startsWith(path));
}
