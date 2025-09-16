import { useEffect, useState } from "react";
import styles from "./ExerciseForm.module.css";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

import { useWorkouts } from "../contexts/WorkoutContext";

import { useNavigate, useParams } from "react-router";

function ExerciseForm({ type }) {
    const {
        exerciseIsLoading,
        isLoading,
        getWorkout,
        createExercise,
        updateExercise,
        currentWorkout: workout,
    } = useWorkouts();
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [reps, setReps] = useState(1);
    const [sets, setSets] = useState(1);
    const [weight, setWeight] = useState(1);
    const [metric, setMetric] = useState("KG");

    useEffect(
        function () {
            getWorkout(params.workoutId);
        },
        [params.workoutId, getWorkout]
    );

    useEffect(
        function () {
            if (type !== "update" || !workout) return;

            const foundExercise = workout.exercises.find((ex) => ex._id === params.exerciseId);
            if (!foundExercise) return;

            setName(foundExercise.name);
            setReps(foundExercise.reps);
            setSets(foundExercise.sets);
            setWeight(foundExercise.weight);
            setMetric(foundExercise.metric);
        },
        [type, workout, params.exerciseId]
    );

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.length < 5 || reps < 1 || sets < 1 || weight < 1) return;

        let exercise;

        if (type === "create") exercise = await createExercise(name, reps, sets, weight, metric, params.workoutId);
        if (type === "update")
            exercise = await updateExercise(params.exerciseId, name, reps, sets, weight, metric, params.workoutId);

        if (!exercise) return;
        navigate(`/workouts/${exercise.workout}`);
    }

    if (isLoading || exerciseIsLoading) return <Spinner />;

    return (
        <main className={styles.exerciseForm}>
            <div className={styles.wrapper}>
                <h1 className={styles.exerciseHeading}>
                    {type === "create" ? "Create an Exercise" : "Update an Exercise"}
                </h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldContainer}>
                        <label>Exercise Name</label>
                        <Input value={name} setValue={setName} />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.fieldContainer}>
                            <label>Reps</label>
                            <input
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                                type="number"
                                className={styles.inputShort}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label>Sets</label>
                            <input
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                                type="number"
                                className={styles.inputShort}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label>Weight</label>
                            <input
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                type="number"
                                className={styles.inputShort}
                            />
                        </div>

                        <div className={styles.fieldContainer}>
                            <label>Metric</label>
                            <select
                                onChange={(e) => setMetric(e.target.value)}
                                className={styles.inputShort}
                                value={metric}
                            >
                                <option value="KG">KG</option>
                                <option value="LBS">LBS</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.btns}>
                        <BackButton>Go Back</BackButton>
                        <Button>{type === "Create" ? "Create Exercise" : "Update Exercise"}</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ExerciseForm;
