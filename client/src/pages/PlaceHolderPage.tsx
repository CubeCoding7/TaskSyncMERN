import { useLocation } from 'react-router-dom';

function PlaceholderPage() {
	const location = useLocation();

	const pageName = location.pathname.split('/').filter(Boolean).pop() || 'Home';

	return (
		<div style={{ padding: '20px', textAlign: 'center' }}>
			<h1>Welcome to the {pageName} page</h1>
			<p>This is a placeholder page for {pageName}.</p>
		</div>
	);
}

export default PlaceholderPage;
