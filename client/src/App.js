import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Workouts from "./pages/Workouts";
import Workout from "./pages/Workout";
import Homepage from "./pages/Homepage";
import WorkoutForm from "./pages/WorkoutForm";
import ExerciseForm from "./pages/ExerciseForm";
import Profile from "./pages/Profile";

import { useUser } from "./contexts/UserContext";

import { useEffect } from "react";
import ProtectWrapper from "./components/ProtectWrapper";
import { WorkoutsProvider } from "./contexts/WorkoutContext";

function App() {
    const { getUser } = useUser();

    useEffect(
        function () {
            getUser();
        },

        [getUser]
    );

    return (
        <BrowserRouter>
            <WorkoutsProvider>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route element={<ProtectWrapper />}>
                        <Route path="workouts" element={<Workouts />} />
                        <Route path="workouts/create" element={<WorkoutForm type={"create"} />} />

                        <Route path="workouts/:workoutId" element={<Workout />} />
                        <Route path="workouts/:workoutId/update" element={<WorkoutForm type={"update"} />} />

                        <Route path="workouts/:workoutId/exercise/create" element={<ExerciseForm type={"create"} />} />
                        <Route
                            path="workouts/:workoutId/exercise/:exerciseId/update"
                            element={<ExerciseForm type={"update"} />}
                        />
                        <Route path="profile" element={<Profile />} />
                    </Route>

                    <Route path="*" element={<h1 style={{ color: "#fff" }}>This Route Doesn't Exist! 404</h1>} />
                </Routes>
            </WorkoutsProvider>
        </BrowserRouter>
    );
}

export default App;
