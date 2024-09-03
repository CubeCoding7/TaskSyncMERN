import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TasksContextProvider } from './context/TaskContext';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './config/queryClient';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<TasksContextProvider>
					<App />
					<ReactQueryDevtools position="bottom" initialIsOpen={false} />
				</TasksContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
