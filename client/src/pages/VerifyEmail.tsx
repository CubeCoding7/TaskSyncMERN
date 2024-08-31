import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail } from '../lib/api';

const VerifyEmail = () => {
	const { code } = useParams();
	const { isPending, isSuccess, isError } = useQuery({
		queryKey: ['emailVerification', code],
		queryFn: () => verifyEmail(code),
	});

	return (
		<div
			style={{
				display: 'flex',
				minHeight: '100vh',
				justifyContent: 'center',
				marginTop: '3rem',
			}}
		>
			<div
				style={{
					maxWidth: '400px',
					width: '100%',
					padding: '2rem',
					textAlign: 'center',
				}}
			>
				{isPending ? (
					<div style={{ margin: '0 auto' }}>
						<div className="spinner"></div>
					</div>
				) : (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '1.5rem',
						}}
					>
						<div
							style={{
								padding: '1rem',
								borderRadius: '8px',
								backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
								color: isSuccess ? '#155724' : '#721c24',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<span style={{ marginRight: '0.5rem' }}>
								{isSuccess ? '✔️' : '❌'}
							</span>
							{isSuccess ? 'Email Verified!' : 'Invalid Link'}
						</div>
						{isError && (
							<p style={{ color: '#6c757d' }}>
								The link is either invalid or expired.{' '}
								<Link
									to="/password/forgot"
									replace
									style={{ color: '#007bff', textDecoration: 'none' }}
								>
									Get a new link
								</Link>
							</p>
						)}
						<Link
							to="/"
							replace
							style={{ color: '#007bff', textDecoration: 'none' }}
						>
							Back to home
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
