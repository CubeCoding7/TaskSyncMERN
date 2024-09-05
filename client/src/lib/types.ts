export interface List {
	_id: string;
	user_id: string;
	name: string;
	category: string;
	tasks: string[];
	createdAt: Date;
	updatedAt: Date;
}

export type Task = {
	_id: string;
	name: string;
	description?: string;
	dueDate?: Date | string | null | undefined;
	user_id: string;
	completed: boolean;
	category: string;
};

export interface User {
	id: string;
	username: string;
	email: string;
	token: string;
}

export interface Action {
	type: 'SET_TASKS' | 'CREATE_TASK' | 'DELETE_TASK' | 'UPDATE_TASK';
	payload: Task[] | Task;
}

export type Dispatch = (action: Action) => void;

export interface State {
	tasks: Task[];
}
