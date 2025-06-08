import styles from "./Workout.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useWorkouts } from "../contexts/WorkoutContext";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import Exercise from "../components/Exercise";
import { useEffect, useState } from "react";
import { calculateDays } from "../utils/utils";

import Modal from "../components/Modal";
import AppNav from "../components/AppNav";

function Workout() {
	const { getWorkout, deleteWorkout, isLoading, currentWorkout: workout } = useWorkouts();
	const { workoutId } = useParams();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);

	useEffect(
		function () {
			getWorkout(workoutId);
		},
		[getWorkout, workoutId]
	);

	if (isLoading || !workout) return <Spinner />;

	const { exercises } = workout;
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		timeZone: "UTC",
		month: "short",
		day: "2-digit",
		year: "numeric",
	}).format(new Date(workout.createdAt));

	function handleDelete() {
		setShow(false);
		deleteWorkout(workoutId);
		navigate("/workouts");
	}

	return (
		<>
			{show ? <Modal onClickNo={() => setShow(false)} onClickYes={() => handleDelete()} /> : ""}
			<AppNav />
			<main className={styles.workout}>
				<BackButton className={styles.btnBack}>Go Back</BackButton>
				<div className={styles.workoutWrapper}>
					<header className={styles.workoutHeader}>
						<div className={styles.workoutHeaderName}>
							<h2 className={styles.workoutName}>{workout.name}</h2>

							<div className={styles.workoutActions}>
								<Link to={`/workouts/${workoutId}/update`}>
									<img src="/icons/icon_writing.png" alt="Update Workout" className={styles.image} />
								</Link>
								<p>
									<img
										src="/icons/icon_trash.png"
										alt="Delete Workout"
										className={styles.image}
										onClick={(e) => setShow(true)}
									/>
								</p>
							</div>
						</div>

						<p className={styles.workoutCreated}>Created On {formattedDate}</p>

						<div className={styles.workoutHeaderContainer}>
							<p>{calculateDays(workout.createdAt, new Date())} Days Ago</p>
							<p>{exercises.length} Exercises</p>
						</div>

						<p className={styles.workoutDescription}>{workout.description}</p>
					</header>

					<Link to={`/workouts/${workoutId}/exercise/create`} className={styles.btnAdd}>
						Add Exercise <img src="/icons/icon_add.png" alt="add btn" className={styles.image} />
					</Link>
					<div className={styles.workoutExercises}>
						{exercises.length ? (
							exercises.map((exercise) => <Exercise exercise={exercise} key={exercise._id} />)
						) : (
							<p style={{ color: "#000" }}>No Exercises for now.</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default Workout;
