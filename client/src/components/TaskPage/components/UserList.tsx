import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../TaskNav.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from 'react-router-dom';

interface Props {
	name: string;
	icon: IconProp;
	category: string;
	listId: string;
}

const List = ({ name, icon, listId }: Props) => {
	const navigate = useNavigate();

	const handleNavigation = () => {
		navigate(`/app/tasks/${listId}`);
	};

	const isActive = location.pathname === `/app/tasks/${listId}`;

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
