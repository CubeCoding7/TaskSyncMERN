export interface List {
	_id: string;
	user_id: string;
	name: string;
	category: string;
	tasks: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Task {
	_id: number;
	name: string;
	description?: string;
	dueDate?: Date;
	user_id: string;
	completed: boolean;
	category: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
	token: string;
	settings: {
		theme?: string;
		notifications?: boolean;
		language?: string;
		color1?: string;
		color2?: string;
	};
}

export interface Settings {
	theme?: string;
	language?: string;
	notifications?: boolean;
	color1?: string;
	color2?: string;
}
