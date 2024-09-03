import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../TaskNav.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
	name: string;
	icon: IconProp;
	category: string;
}

const List = ({ name, icon, category }: Props) => {
	return (
		<li>
			<button
			// className={`${styles.navLink} ${
			// 	activeCategory === category ? styles.active : ''
			// }`}
			// onClick={console.log('test')}
			>
				<FontAwesomeIcon className={styles.icon} icon={icon} />
				{name}
			</button>
		</li>
	);
};

export default List;
