import styles from "./Exercise.module.css";

import { Link } from "react-router-dom";

import { useWorkouts } from "../contexts/WorkoutContext";
import { useState } from "react";
import Modal from "./Modal";

function Exercise({ exercise }) {
	const { currentWorkout: workout, deleteExercise } = useWorkouts();
	const [show, setShow] = useState(false);

	function handleDelete() {
		deleteExercise(workout._id, exercise._id);
		setShow(false);
	}

	return (
		<>
			{show ? <Modal onClickNo={() => setShow(false)} onClickYes={handleDelete} /> : ""}
			<div className={styles.exercise}>
				<header className={styles.exerciseHeader}>
					<h3 className={styles.exerciseName}>{exercise.name}</h3>

					<div className={styles.exerciseActions}>
						<Link to={`/workouts/${workout._id}/exercise/${exercise._id}/update`}>
							<img src="/icons/icon_writing.png" alt="Update Workout" className={styles.image} />
						</Link>

						<p>
							<img src="/icons/icon_trash.png" alt="Delete Workout" className={styles.image} onClick={(e) => setShow(true)} />
						</p>
					</div>
				</header>

				<div className={styles.exerciseInfo}>
					<p className={styles.exerciseWeight}>{`${exercise.weight}${exercise.metric}`}</p>

					<p className={styles.exerciseSetsReps}>
						<span>{exercise.sets}</span> Sets, <span>{exercise.reps}</span> Reps
					</p>
				</div>
			</div>
		</>
	);
}

export default Exercise;
