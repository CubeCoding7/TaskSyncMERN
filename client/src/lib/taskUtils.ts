import { Task as TaskType } from '../types';
import { isToday, isTomorrow, isSameDay, startOfDay, format } from 'date-fns';

export const formatDate = (date: Date | string | undefined): string => {
	// Handle undefined or invalid input
	if (!date) return '';

	// Convert to Date object if it's a string
	let d: Date;
	if (typeof date === 'string') {
		d = new Date(date);
	} else if (date instanceof Date) {
		d = date;
	} else {
		return ''; // Return an empty string for invalid types
	}

	// Check if the date is valid
	if (isNaN(d.getTime())) {
		return ''; // Return an empty string for invalid dates
	}

	// Extract components from the date in UTC
	const day = d.getUTCDate();
	const month = d.getUTCMonth(); // Months are zero-based
	const year = d.getUTCFullYear();

	// Define month names
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

	// Format date as "MMM d, yyyy"
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

			if (category === 'today' && !task.completed) {
				if (!task.dueDate) {
					return false;
				}
				return isSameDay(startOfDay(new Date()), task.dueDate);
			}
			return task.category === category && !task.completed;
		})
		.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
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
			// Convert string to Date object with proper timezone handling
			dueDate = new Date(task.dueDate);
		} else if (task.dueDate instanceof Date) {
			dueDate = task.dueDate;
		} else {
			return false; // If dueDate is undefined or invalid, skip the task
		}

		// Normalize dueDate to the start of the day (ignoring time zone issues)
		dueDate = startOfDay(
			new Date(dueDate.getTime() + dueDate.getTimezoneOffset() * 60000)
		);

		// Compare the start of the day to check if the task is for this day
		return isSameDay(startOfDayDate, dueDate);
	});
};
