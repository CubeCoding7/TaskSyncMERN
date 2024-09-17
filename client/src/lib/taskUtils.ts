import { Task as TaskType } from '../types';
import { isToday, isTomorrow, isSameDay, startOfDay, format } from 'date-fns';

export const formatDate = (date: Date | string | undefined): string => {
	if (!date) return '';

	let d: Date;
	if (typeof date === 'string') {
		d = new Date(date);
	} else if (date instanceof Date) {
		d = date;
	} else {
		return '';
	}

	if (isNaN(d.getTime())) {
		return '';
	}

	const day = d.getUTCDate();
	const month = d.getUTCMonth();
	const year = d.getUTCFullYear();

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const formattedDate = `${monthNames[month].substring(0, 3)} ${day}, ${year}`;

	return formattedDate;
};

export const sortTasks = (tasks: TaskType[], category: string) => {
	return tasks
		.filter((task) => {
			if (category === 'completed') {
				return task.completed;
			}
			if (category === 'all') {
				return true;
			}

			if (category === 'today' && !task.completed && task.dueDate) {
				const today = new Date();
				return isSameDay(formatDate(today), formatDate(task.dueDate));
			}
			return task.category === category && !task.completed;
		})
		.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
};

export const scheduledTasks = (tasks: TaskType[]) => {
	return tasks;
};

export const formatDay = (date: Date): string => {
	const dayOfWeek = format(date, 'EEEE');
	const formattedDate = format(date, 'MMM d');
	if (isToday(date)) {
		return `${formattedDate} ‧ Today ‧ ${dayOfWeek}`;
	}
	if (isTomorrow(date)) {
		return `${formattedDate} ‧ Tomorrow ‧ ${dayOfWeek}`;
	}
	return `${formattedDate} ‧ ${dayOfWeek}`;
};

export const getTasksForDay = (date: Date, tasks: TaskType[]): TaskType[] => {
	const startOfDayDate = startOfDay(date);

	return tasks.filter((task) => {
		let dueDate: Date;

		if (typeof task.dueDate === 'string') {
			dueDate = new Date(task.dueDate);
		} else if (task.dueDate instanceof Date) {
			dueDate = task.dueDate;
		} else {
			return false;
		}

		dueDate = startOfDay(
			new Date(dueDate.getTime() + dueDate.getTimezoneOffset() * 60000)
		);

		return isSameDay(startOfDayDate, dueDate);
	});
};
