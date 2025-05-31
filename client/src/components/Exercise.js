import styles from "./Exercise.module.css";

function Exercise({ exercise }) {
	return (
		<div className={styles.exercise}>
			<h3 className={styles.exerciseName}>{exercise.name}</h3>

			<div className={styles.exerciseInfo}>
				<p className={styles.exerciseWeight}>{`${exercise.weight}${exercise.metric}`}</p>

				<p className={styles.exerciseSetsReps}>
					<span>{exercise.sets}</span> Sets, <span>{exercise.reps}</span> Reps
				</p>
			</div>
		</div>
	);
}

export default Exercise;
