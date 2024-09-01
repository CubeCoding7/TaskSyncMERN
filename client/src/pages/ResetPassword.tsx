import { useSearchParams, Link } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	const exp = Number(searchParams.get('exp'));
	const now = Date.now();
	const linkIsValid = code && exp && exp > now;

	return (
		<div
			style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center' }}
		>
			<div
				style={{
					maxWidth: '500px',
					margin: 'auto',
					padding: '3rem 1.5rem',
					textAlign: 'center',
				}}
			>
				{linkIsValid ? (
					<ResetPasswordForm code={code} />
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
								display: 'flex',
								alignItems: 'center',
								padding: '1rem',
								backgroundColor: '#f8d7da',
								borderRadius: '12px',
							}}
						>
							<span style={{ marginRight: '0.5rem' }}>⚠️</span>
							Invalid Link
						</div>
						<p style={{ color: '#718096' }}>
							The link is either invalid or expired.
						</p>
						<Link to="/password/forgot" replace style={{ color: '#3182ce' }}>
							Request a new password reset link
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResetPassword;
