import { useState } from 'react';
import styles from './auth.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/auth';

const Login: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const redirectUrl = location.state?.redirectUrl || '/app/home';

	const {
		mutate: signIn,
		isPending,
		isError,
	} = useMutation({
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
			navigate(redirectUrl, { replace: true });
		},
		onError: (error) => {
			console.error('Login failed: ', error);
		},
	});

	return (
		<div className={styles.formContent}>
			<form className={styles.login}>
				<h2>Log in</h2>
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
					onKeyDown={(e) => e.key === 'Enter' && signIn({ email, password })}
					className={styles.input}
				/>
				<Link to="/password/forgot">Forgot password?</Link>
				{isError && <p>Invalid email or password</p>}
				<button
					type="button"
					disabled={!email || password.length < 6}
					onClick={() => signIn({ email, password })}
					className={styles.button}
				>
					{isPending ? <div className="spinner"></div> : 'Log In'}
				</button>
				<p>
					Don't have an account?{' '}
					<Link to="/register" className={styles.link}>
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
