import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import error from "../components/Error";
import axios from "axios";

const WorkoutsContext = createContext();

const initialState = {
	workouts: [],
	currentWorkout: null,
	isLoading: false,
	exerciseIsLoading: false,
};

const BASE_URL = "http://localhost:5000/api/v1";

function reducer(state, action) {
	switch (action.type) {
		case "workouts/loaded":
			return { ...state, workouts: action.payload };
		case "workout/loaded":
			return { ...state, currentWorkout: action.payload };
		case "workout/created":
			return { ...state, workouts: [...state.workouts, action.payload] };
		case "workout/deleted":
			return { ...state, workout: state.workouts.filter((workout) => workout._id !== action.payload._id) };
		case "workout/updated":
			return {
				...state,
				workouts: state.workouts.filter((workout) => workout._id !== action.payload._id).push(action.payload),
			};

		case "exercise/created":
			return {
				...state,
				currentWorkout: {
					...state.currentWorkout,
					currentWorkout: { exercises: [action.payload, ...state.currentWorkout.exercises] },
				},
			};
		case "exercise/updated":
			return { ...state };
		case "exercise/deleted":
			return { ...state };

		case "loading":
			return { ...state, isLoading: true };
		case "loaded":
			return { ...state, isLoading: false };

		case "exercise/loading":
			return { ...state, exerciseIsLoading: true };
		case "exercise/hasLoaded":
			return { ...state, exerciseIsLoading: false };

		default:
			throw new Error("Unknown Action");
	}
}

function WorkoutsProvider({ children }) {
	const [{ workouts, currentWorkout, isLoading }, dispatch] = useReducer(reducer, initialState);

	const getWorkouts = useCallback(async function getWorkouts() {
		try {
			dispatch({ type: "loading" });

			const res = await axios({
				url: `${BASE_URL}/workout`,
				method: "GET",
				withCredentials: true,
			});

			if (res.statusText !== "OK") return;

			dispatch({ type: "workouts/loaded", payload: res.data.data.workouts });
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "loaded" });
		}
	}, []);

	const getWorkout = useCallback(async function getWorkout(id) {
		try {
			dispatch({ type: "loading" });

			const res = await axios({
				url: `${BASE_URL}/workout/${id}`,
				method: "GET",
				withCredentials: true,
			});

			if (res.statusText !== "OK") return;

			dispatch({ type: "workout/loaded", payload: res.data.data.workout });
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "loaded" });
		}
	}, []);

	const createWorkout = useCallback(async function createWorkout(name, description) {
		try {
			dispatch({ type: "loading" });

			const res = await axios({
				url: `${BASE_URL}/workout/`,
				method: "POST",
				data: { name, description },
				withCredentials: true,
			});

			if (res.statusText !== "Created") return;

			dispatch({ type: "workout/created", payload: res.data.data.workout });

			return res.data.data.workout;
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "loaded" });
		}
	}, []);

	const updateWorkout = useCallback(async function updateWorkout(id, name, description) {
		try {
			dispatch({ type: "loading" });

			const res = await axios({
				url: `${BASE_URL}/workout/${id}`,
				method: "PATCH",
				data: {
					name,
					description,
				},
				withCredentials: true,
			});

			if (res.statusText !== "OK") return;

			dispatch({ type: "workout/updated", payload: res.data.data.workout });

			return res.data.data.workout;
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "loaded" });
		}
	}, []);

	const deleteWorkout = useCallback(async function deleteWorkout(id) {
		try {
			dispatch({ type: "loading" });
			const res = await axios({ url: `${BASE_URL}/workout/${id}`, method: "DELETE", withCredentials: true });

			console.log(res);
			if (res.statusText !== "Deleted") return;

			dispatch({ type: "workout/deleted" });
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "loaded" });
		}
	}, []);

	const createExercise = useCallback(async function createExercise(name, reps, sets, weight, metric, workoutId) {
		try {
			dispatch({ type: "exercise/loading" });

			const res = await axios({
				url: `${BASE_URL}/workout/${workoutId}/exercise`,
				method: "POST",
				data: { name, reps, sets, weight, metric },
				withCredentials: true,
			});

			if (res.statusText !== "Created") return;

			dispatch({ type: "exercise/created", payload: res.data.data.exercise });
			return res.data.data.exercise;
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "exercise/hasLoaded" });
		}
	}, []);

	const deleteExercise = useCallback(async function deleteExercise(id) {
		try {
			dispatch({ type: "exercise/loading" });
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "exercise/hasLoaded" });
		}
	}, []);

	const updateExercise = useCallback(async function updateExercise(id, name, reps, sets, weight, metric, workoutId) {
		try {
			dispatch({ type: "exercise/loading" });
		} catch (err) {
			error("Red", err.response.data.message);
		} finally {
			dispatch({ type: "exercise/hasLoaded" });
		}
	}, []);

	const contextValue = useMemo(
		() => ({
			workouts,
			currentWorkout,
			isLoading,
			getWorkouts,
			createWorkout,
			getWorkout,
			updateWorkout,
			deleteWorkout,
			createExercise,
			updateExercise,
			deleteExercise,
		}),
		[
			workouts,
			currentWorkout,
			isLoading,
			getWorkout,
			getWorkouts,
			createWorkout,
			updateExercise,
			updateWorkout,
			deleteExercise,
			deleteWorkout,
			createExercise,
		]
	);

	return <WorkoutsContext.Provider value={contextValue}>{children}</WorkoutsContext.Provider>;
}

function useWorkouts() {
	const context = useContext(WorkoutsContext);

	if (context === undefined) throw new Error("WorkoutContext is outside of the scope of WorkoutProvider");

	return context;
}

export { WorkoutsProvider, useWorkouts };
