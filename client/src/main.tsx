import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './config/queryClient';
import App from './App';
import './index.css';
import { SettingsProvider } from './context/SettingsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<SettingsProvider>
					<App />
					<ReactQueryDevtools position="bottom" initialIsOpen={false} />
				</SettingsProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
