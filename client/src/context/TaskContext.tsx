import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { tasksReducer } from '../reducers/tasksReducer';

export interface Task {
	_id: string;
	name: string;
	description: string;
	completed: boolean;
	category?: string;
	dueDate: Date;
	createdAt: string;
}

export interface State {
	tasks: Task[];
}

export interface Action {
	type: 'SET_TASKS' | 'CREATE_TASK' | 'DELETE_TASK';
	payload: Task[] | Task;
}

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
