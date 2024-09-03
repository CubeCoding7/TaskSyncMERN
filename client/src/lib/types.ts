export interface List {
	_id: string;
	user_id: string;
	name: string;
	category: string;
	tasks: string[];
	createdAt: Date;
	updatedAt: Date;
}
