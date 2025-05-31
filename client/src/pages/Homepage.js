import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Homepage() {
	return (
		<main>
			<Link to="/workouts">Workouts</Link>
		</main>
	);
}

export default Homepage;
