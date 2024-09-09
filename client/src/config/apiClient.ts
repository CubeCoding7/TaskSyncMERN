import axios from 'axios';
import queryClient from './queryClient';
import { navigate } from '../lib/navigation';

const options = {
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
};

const API = axios.create(options);
const TokenRefreshClient = axios.create(options);

API.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

API.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const { config, response } = error;
		const { status, data } = response || {};

		if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
			try {
				const {
					data: { accessToken },
				} = await TokenRefreshClient.get('/auth/refresh');
				localStorage.setItem('accessToken', accessToken);

				config.headers['Authorization'] = `Bearer ${accessToken}`;
				return API(config);
			} catch (refreshError) {
				console.log('Error refreshing token:', refreshError);
				queryClient.clear();
				navigate('/login', {
					state: {
						redirectUrl: window.location.pathname,
					},
				});
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject({ status, ...data });
	}
);

export default API;
