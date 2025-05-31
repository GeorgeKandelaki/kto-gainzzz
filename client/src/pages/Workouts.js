import { useEffect } from "react";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../contexts/WorkoutContext";
import styles from "./Workouts.module.css";
import Spinner from "../components/Spinner";

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
			<h1 className={styles.workoutsHeading}>Your Workouts</h1>

			<header className={styles.workoutsHeader}></header>

			<div className={styles.workouts}>
				{workouts.map((workout) => (
					<WorkoutItem workout={workout} key={workout._id} />
				))}
			</div>
		</main>
	);
}

export default Workouts;
