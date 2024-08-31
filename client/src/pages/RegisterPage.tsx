import { useState } from 'react';
import styles from './auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '../lib/api';

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const {
		mutate: createAccount,
		isPending,
		error,
	} = useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate('/app/home', {
				replace: true,
			});
		},
		onError: (error) => {
			console.error('Login failed: ', error);
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
					e.key === 'Enter' && register({ email, password, confirmPassword })
				}
				className={styles.input}
			/>
			{error?.message || 'an error occurred'}
			<button
				type="button"
				disabled={!email || password.length < 6 || password !== confirmPassword}
				onClick={() => createAccount({ email, password, confirmPassword })}
				className={styles.button}
			>
				{isPending ? <div className={styles.spinner}></div> : 'Log In'}
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
