import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { resetPassword } from '../api/auth';

interface ResetPasswordFormProps {
	code: string;
}

const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
	const [password, setPassword] = useState('');
	const {
		mutate: resetUserPassword,
		isPending,
		isSuccess,
		isError,
		error,
	} = useMutation({
		mutationFn: resetPassword,
	});

	return (
		<>
			<h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
				Change your password
			</h2>
			<div
				style={{
					borderRadius: '0.5rem',
					backgroundColor: '#2D3748',
					boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
					padding: '2rem',
				}}
			>
				{isError && (
					<div style={{ marginBottom: '1rem', color: '#FC8181' }}>
						{error.message || 'An error occurred'}
					</div>
				)}
				{isSuccess ? (
					<div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								borderRadius: '0.75rem',
								backgroundColor: '#48BB78',
								padding: '1rem',
								marginBottom: '1rem',
							}}
						>
							<span style={{ marginRight: '0.5rem' }}>✅</span>
							Password updated successfully!
						</div>
						<Link to="/login" replace style={{ color: '#3182ce' }}>
							Sign in
						</Link>
					</div>
				) : (
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
					>
						<div>
							<label
								htmlFor="password"
								style={{ display: 'block', marginBottom: '0.5rem' }}
							>
								New Password
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={(e) =>
									e.key === 'Enter' &&
									resetUserPassword({ password, verificationCode: code })
								}
								autoFocus
								style={{
									width: '100%',
									padding: '0.75rem',
									borderRadius: '0.375rem',
									border: '1px solid #CBD5E0',
									backgroundColor: '#1A202C',
									color: '#E2E8F0',
								}}
							/>
						</div>
						<button
							style={{
								padding: '0.75rem',
								backgroundColor: '#3182ce',
								color: 'white',
								borderRadius: '0.375rem',
								border: 'none',
								cursor:
									isPending || password.length < 6 ? 'not-allowed' : 'pointer',
								opacity: isPending || password.length < 6 ? 0.6 : 1,
							}}
							disabled={isPending || password.length < 6}
							onClick={() =>
								resetUserPassword({
									password,
									verificationCode: code,
								})
							}
						>
							{isPending ? 'Resetting...' : 'Reset Password'}
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ResetPasswordForm;
