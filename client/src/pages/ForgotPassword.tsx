import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../api/auth';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState('');

	const {
		mutate: sendPasswordReset,
		isPending,
		isSuccess,
		isError,
		error,
	} = useMutation({
		mutationFn: sendPasswordResetEmail,
	});

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.heading}>Reset your password</h1>
				{isError && (
					<div className={styles.error}>
						{error.message || 'An error occurred'}
					</div>
				)}
				<div className={styles.form}>
					{isSuccess ? (
						<div className={styles.success}>
							<p>Email sent! Check your inbox for further instructions.</p>
						</div>
					) : (
						<>
							<label htmlFor="email" className={styles.label}>
								Email address
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={styles.input}
								autoFocus
							/>
							<button
								className={styles.button}
								disabled={!email || isPending}
								onClick={() => sendPasswordReset(email)}
							>
								{isPending ? 'Sending...' : 'Reset Password'}
							</button>
						</>
					)}
					<p className={styles.text}>
						Go back to{' '}
						<Link to="/login" className={styles.link}>
							Sign in
						</Link>
						&nbsp;or&nbsp;
						<Link to="/register" className={styles.link}>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
