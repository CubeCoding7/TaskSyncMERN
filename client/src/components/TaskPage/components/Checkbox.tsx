import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import styles from './Checkbox.module.css';

interface CheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
	const [hovered, setHovered] = useState(false);

	const handleClick = () => {
		onChange(!checked);
	};

	const showCheckboxIcon = () => {
		setHovered(true);
	};

	const hideCheckboxIcon = () => {
		setHovered(false);
	};

	return (
		<div
			onClick={handleClick}
			onMouseEnter={showCheckboxIcon}
			onMouseLeave={hideCheckboxIcon}
			className={styles.checkboxWrapper}
		>
			<div className={`${styles.checkbox} ${hovered ? styles.checked : ''}`}>
				{checked && <FontAwesomeIcon className={styles.icon} icon={faCheck} />}
			</div>
		</div>
	);
};

export default Checkbox;
