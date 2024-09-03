import Widget from '../components/Widget';
import useAuth from '../hooks/useAuth';
// import useAuth from '../hooks/useAuth';
import styles from './AppPage.module.css';
import {
	faCalendarDays,
	faListCheck,
	faStickyNote,
} from '@fortawesome/pro-solid-svg-icons';

function AppPage() {
	const { user } = useAuth();

	console.log(user?.email);
	return (
		<div className={styles.widgets}>
			<Widget name="Tasks" icon={faListCheck} />
			<Widget name="Notes" icon={faStickyNote} />
			<Widget name="Calendar" icon={faCalendarDays} />
			<Widget name="Notes" icon={faStickyNote} />
		</div>
	);
}

export default AppPage;
