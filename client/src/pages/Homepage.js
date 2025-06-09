import styles from "./Homepage.module.css";

import Header from "../components/Header";
import { Link } from "react-router";
import { useUser } from "../contexts/UserContext";

function Homepage() {
	const { user } = useUser();

	return (
		<main className={styles.homepage}>
			<Header />

			<section>
				<h1>Make tracking your GYM GAINZZZ satisfying.</h1>
				<h2>Stay focused on your grind, our workout tracker keeps it safe, smooth, and stress-free.</h2>

				<Link to={!user ? "/login" : "/workouts"} className={styles.cta}>
					Start tracking now
				</Link>
			</section>
		</main>
	);
}

export default Homepage;
