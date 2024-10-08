import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../TaskNav.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
	name: string;
	icon: IconProp;
	category: string;
}

const List = ({ name, icon, category }: Props) => {
	const navigate = useNavigate();

	const handleNavigation = () => {
		navigate(`/app/tasks/${category}`);
	};

	const isActive = useLocation().pathname.includes(`/app/tasks/${category}`);
	return (
		<li>
			<button
				className={`${styles.navLink} ${isActive ? styles.active : ''}`}
				onClick={handleNavigation}
			>
				<FontAwesomeIcon className={styles.icon} icon={icon} />
				{name}
			</button>
		</li>
	);
};

export default List;
