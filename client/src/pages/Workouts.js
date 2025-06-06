import { useEffect, useState } from "react";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../contexts/WorkoutContext";
import styles from "./Workouts.module.css";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { Link } from "react-router";

function WorkoutsHeader() {
	const { searchWorkouts } = useWorkouts();

	const [search, setSearch] = useState("");

	function handleSearch() {
		searchWorkouts(search);
	}

	return (
		<header className={styles.workoutsHeader}>
			<form className={styles.workoutsSearchWrapper} onSubmit={handleSearch}>
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for Workouts..."
					className={styles.workoutsSearch}
				/>
				<button className={styles.btnSearch}>
					<img src="/icons/icon_search.png" alt="Search Button" className={styles.image} />
				</button>
			</form>

			<Link to="/workouts/create" className={`btn ${styles.btnCreate}`}>
				Create Workout
			</Link>
		</header>
	);
}

function Workouts() {
	const { getWorkouts, workouts, isLoading } = useWorkouts();

	useEffect(
		function () {
			getWorkouts();
		},
		[getWorkouts]
	);

	if (isLoading) return <Spinner />;

	return (
		<main className={styles.workoutsContainer}>
			<Header />
			<WorkoutsHeader />

			{!workouts.length ? (
				<p className={styles.errorMsg}>No Workouts Found!</p>
			) : (
				<>
					<div className={styles.workouts}>
						{workouts.map((workout) => (
							<WorkoutItem workout={workout} key={workout._id} />
						))}
					</div>
				</>
			)}
		</main>
	);
}

export default Workouts;
