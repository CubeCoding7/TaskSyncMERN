import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { tasksReducer } from '../reducers/tasksReducer';
import { State, Action } from '../lib/types';

export const TasksContext = createContext<
	{ state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

interface TasksContextProviderProps {
	children: ReactNode;
}

export const TasksContextProvider = ({
	children,
}: TasksContextProviderProps) => {
	const [state, dispatch] = useReducer(tasksReducer, {
		tasks: [],
	});

	return (
		<TasksContext.Provider value={{ state, dispatch }}>
			{children}
		</TasksContext.Provider>
	);
};
