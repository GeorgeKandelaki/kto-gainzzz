import styles from "./WorkoutItem.module.css";

import { Link } from "react-router-dom";

import { calculateDays } from "../utils/utils";

function WorkoutItem({ workout }) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		timeZone: "UTC",
		month: "short",
		day: "2-digit",
		year: "numeric",
	}).format(new Date(workout.createdAt));

	return (
		<div className={styles.workout}>
			<h3 className={styles.workoutName}>{workout.name}</h3>
			<div className={styles.workoutHeader}>
				<p className={styles.workoutCreatedAt}>Created At: {formattedDate}</p>
				<span className={styles.workoutItemsCount}>{workout.exercises.length} Exercises</span>
			</div>
			<p className={styles.workoutDescription}>{workout.description}</p>

			<div className={styles.workoutFooter}>
				<p>{calculateDays(workout.createdAt, new Date())} Days Ago</p>
				<Link className={styles.link} to={`/workouts/${workout._id}`}>
					See Exercises {"->"}{" "}
				</Link>
			</div>
		</div>
	);
}

export default WorkoutItem;
