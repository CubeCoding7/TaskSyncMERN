import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
	href: string;
	icon: IconProp;
	activeLink: string;
}

export default function SideBarButton({ href, icon, activeLink }: Props) {
	return (
		<NavLink
			to={href}
			className={() =>
				window.location.pathname.startsWith(activeLink)
					? `${styles.iconLink} ${styles.active}`
					: styles.iconLink
			}
		>
			<div className={styles.iconActiveLine}></div>
			<FontAwesomeIcon icon={icon} />
		</NavLink>
	);
}
