import { updateUserSettings } from '../api/user';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../config/queryClient';

import { Settings } from '../types';

const useUpdateSettings = () => {
	return useMutation<void, Error, Settings>({
		mutationFn: (settings: Settings) => updateUserSettings(settings),
		onSuccess: () => {
			queryClient.invalidateQueries();
			console.log('Settings updated successfully');
		},
		onError: (error) => {
			console.error('Error updating settings:', error);
		},
	});
};

export default useUpdateSettings;
