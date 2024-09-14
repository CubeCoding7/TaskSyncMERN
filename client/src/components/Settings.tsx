import { useEffect, useState } from 'react';
import styles from './Settings.module.css';
import useAuth from '../hooks/useAuth';
import '../index.css';
import { hexToRgb, rgbToHex } from '../lib/colorUtils';
import { Settings as SettingsType } from '../types';
import useUpdateSettings from '../hooks/useUpdateSettings';
import { useSettings } from '../hooks/useSettings';

const Settings: React.FC = () => {
	const { isVisible, hideSettings, tab } = useSettings();
	const [selectedTab, setSelectedTab] = useState('account');

	useEffect(() => {
		setSelectedTab(tab);
	}, [tab]);

	const { user } = useAuth();
	const [color1, setColor1] = useState<string>(rgbToHex(user?.settings.color1));
	const [color2, setColor2] = useState<string>(
		rgbToHex(user?.settings.color2) || '#00c77b'
	);

	const { mutate } = useUpdateSettings();

	const handleSave = () => {
		const firstColor = hexToRgb(color1);
		const secondColor = hexToRgb(color2);

		console.log(firstColor + ' plus ' + secondColor);

		const settings: SettingsType = {
			color1: firstColor,
			color2: secondColor,
		};

		mutate(settings);
	};

	const renderContent = () => {
		switch (selectedTab) {
			case 'account':
				return (
					<div className={styles.content}>
						<h2>Account</h2>
						{/* Your account-related settings */}
					</div>
				);
			case 'general':
				return (
					<div className={styles.content}>
						<h2>General Settings</h2>
					</div>
				);
			case 'appearance':
				return (
					<div className={styles.content}>
						<h2>Appearance</h2>
						<label>Background color</label>
						<div>
							<label>Select two colors for the gradient: </label>
							<input
								className="colorPicker"
								type="color"
								value={color1}
								onChange={(e) => setColor1(e.target.value)}
								autoComplete="off"
							/>
							<input
								className="colorPicker"
								type="color"
								id="color2"
								value={color2}
								onChange={(e) => setColor2(e.target.value)}
								autoComplete="off"
							/>
						</div>
						<button onClick={handleSave}>Save Settings</button>
					</div>
				);
			default:
				return null;
		}
	};

	if (!isVisible) return null;

	return (
		<div className={styles.overlay} onClick={hideSettings}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.sidebar}>
					<ul>
						<li
							onClick={() => setSelectedTab('account')}
							className={selectedTab === 'account' ? styles.active : ''}
						>
							Account
						</li>
						<li
							onClick={() => setSelectedTab('general')}
							className={selectedTab === 'general' ? styles.active : ''}
						>
							General
						</li>
						<li
							onClick={() => setSelectedTab('appearance')}
							className={selectedTab === 'appearance' ? styles.active : ''}
						>
							Appearance
						</li>
					</ul>
				</div>
				<div className={styles.mainContent}>{renderContent()}</div>
				<button className={styles.closeButton} onClick={hideSettings}>
					X
				</button>
			</div>
		</div>
	);
};

export default Settings;
