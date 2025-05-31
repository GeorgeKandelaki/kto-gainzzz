import styles from "./WorkoutForm.module.css";
import { useWorkouts } from "../contexts/WorkoutContext";
import { useEffect, useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router";
import Spinner from "../components/Spinner";

function WorkoutForm({ type }) {
	const { createWorkout, updateWorkout, currentWorkout: workout, getWorkout, isLoading } = useWorkouts();
	const navigate = useNavigate();
	const { workoutId } = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (type !== "update") return;
		getWorkout(workoutId);
	}, [getWorkout, workoutId, type]);

	useEffect(() => {
		if (type !== "update" || !workout) return;
		setName(workout.name || "");
		setDescription(workout.description || "");
	}, [type, workout]);

	async function handleSubmit(e) {
		e.preventDefault();
		let workout;

		if (name.length < 5) return;
		if (type === "create") workout = await createWorkout(name, description);
		if (type === "update") workout = await updateWorkout(workoutId, name, description);

		if (!workout) return;
		navigate(`/workouts/${workout._id}`);
	}

	if (isLoading) return <Spinner />;

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<h1 className={styles.heading}>{type === "create" ? "Create new Workout" : "Update Workout"} </h1>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.fieldContainer}>
						<label>Name</label>
						<Input value={name} setValue={setName} />
					</div>
					<div className={styles.fieldContainer}>
						<label>Description</label>
						<textarea
							className={styles.description}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>

					<div className={styles.btnContainer}>
						<BackButton>Go Back</BackButton>
						<Button>{type === "create" ? "Create Workout" : "Update Workout"}</Button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default WorkoutForm;
