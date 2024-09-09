import React, { useState } from 'react';
import styles from './NewTaskForm.module.css';

interface Props {
	toggleVisibility: () => void;
}

const NewTaskForm = ({ toggleVisibility }: Props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [emptyFields, setEmptyFields] = useState<string[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const task = { name, description, dueDate };

		const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
			method: 'POST',
			body: JSON.stringify(task),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields || []);
		}

		if (response.ok) {
			setName('');
			setDescription('');
			setDueDate('');
			setError(null);
			setEmptyFields([]);
			console.log('new task added', json);

			toggleVisibility();
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.newTaskForm}>
			<div className={styles.inputArea}>
				<input
					type="text"
					placeholder="name"
					onChange={(e) => setName(e.target.value)}
					value={name}
					className={emptyFields.includes('name') ? 'error' : ''}
				/>
				<textarea
					name="description"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className={emptyFields.includes('description') ? 'error' : ''}
				></textarea>
			</div>
			<div className={styles.actions}>
				<input
					type="Date"
					onChange={(e) => setDueDate(e.target.value)}
					value={dueDate}
					className={emptyFields.includes('dueDate') ? 'error' : ''}
				/>
				<div>
					<button
						type="button"
						className={styles.cancelButton}
						onClick={toggleVisibility}
					>
						Cancel
					</button>
					<button type="submit" className={styles.addButton}>
						Add Task
					</button>

					{error && <div className={styles.error}>{error}</div>}
				</div>
			</div>
		</form>
	);
};

export default NewTaskForm;
