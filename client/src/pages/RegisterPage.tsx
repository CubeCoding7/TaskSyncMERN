import { useState } from 'react';
import styles from './auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '../api/auth';

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const {
		mutate: createAccount,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate('/app/home', {
				replace: true,
			});
		},
		onError: (error) => {
			console.error('Registration failed: ', error);
		},
	});

	return (
		<form className={styles.login}>
			<h2>Register</h2>
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
				className={styles.input}
			/>
			<label htmlFor="username">Username</label>
			<input
				type="name"
				id="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				autoFocus
				className={styles.input}
			/>
			<label className={styles.label} htmlFor="password">
				Password
			</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={styles.input}
			/>
			<label className={styles.label} htmlFor="confirmPassword">
				Confirm Password
			</label>
			<input
				type="password"
				id="confirmPassword"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				onKeyDown={(e) =>
					e.key === 'Enter' &&
					createAccount({ email, username, password, confirmPassword })
				}
				className={styles.input}
			/>
			{isError && <p>{error?.message || 'An error occurred'}</p>}

			<button
				type="button"
				disabled={
					!email ||
					!username ||
					password.length < 6 ||
					password !== confirmPassword
				}
				onClick={() =>
					createAccount({ email, username, password, confirmPassword })
				}
				className={styles.button}
			>
				{isPending ? <div className={styles.spinner}></div> : 'Register'}
			</button>
			<p>
				Already have an account?{' '}
				<Link to="/login" className={styles.link}>
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default Register;
