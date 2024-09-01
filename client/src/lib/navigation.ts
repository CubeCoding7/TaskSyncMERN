type NavigateOptions = {
	replace?: boolean;
	state?: {
		redirectUrl: string;
	};
};

type NavigateFunction = (path: string, options?: NavigateOptions) => void;

export let navigate: NavigateFunction = () => {};

export const setNavigate = (fn: NavigateFunction) => {
	navigate = fn;
};
