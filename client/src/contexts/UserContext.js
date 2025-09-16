import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import error from "./../components/Error";

const UserContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

// const DOMAIN = {
// production: "95.104.13.159",
// development: "localhost",
// };

const BASE_URL = `https://kto-gainzzz-backend.onrender.com/api/v1`;

function reducer(state, action) {
    switch (action.type) {
        case "user/loaded":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "user/logout":
            return initialState;
        case "user/updated":
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload.name || state.name,
                    avatar: action.payload.avatar || state.avatar,
                },
            };
        case "user/deleted":
            return initialState;

        case "loading":
            return { ...state, isLoading: true };
        case "loaded":
            return { ...state, isLoading: false };

        default:
            throw new Error("Unknown Action");
    }
}

function UserProvider({ children }) {
    const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(reducer, initialState);

    const getUser = useCallback(async function getUser() {
        try {
            dispatch({ type: "loading" });

            const res = await axios({
                url: `${BASE_URL}/user/me`,
                method: "GET",
                withCredentials: true,
            });

            if (res.statusText !== "OK") return;

            dispatch({ type: "user/loaded", payload: res.data.data.user });
        } catch (err) {
            console.error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const signupUser = useCallback(async function signupUser(name, password, passwordConfirm) {
        try {
            dispatch({ type: "loading" });
            const res = await axios({
                url: `${BASE_URL}/user/signup`,
                method: "POST",
                data: {
                    name,
                    password,
                    avatar: "default.png",
                    passwordConfirm,
                },
                withCredentials: true,
            });

            if (res.statusText !== "OK") return false;

            dispatch({ type: "user/loaded", payload: res.data.data.user });

            return true;
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const loginUser = useCallback(async function loginUser(name, password) {
        try {
            dispatch({ type: "loading" });

            const res = await axios({
                url: `${BASE_URL}/user/login`,
                method: "POST",
                data: {
                    name,
                    password,
                },
                withCredentials: true,
            });

            if (res.statusText !== "OK") return false;

            dispatch({ type: "user/loaded", payload: res.data.data.user });
            return true;
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const logoutUser = useCallback(async function logoutUser() {
        try {
            dispatch({ type: "loading" });

            const res = await axios({
                url: `${BASE_URL}/user/logout`,
                method: "GET",
                withCredentials: true,
            });

            if (res.statusText !== "OK") return;

            dispatch({ type: "user/logout" });
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const deleteMe = useCallback(async function () {
        try {
            dispatch({ type: "loading" });

            const res = await axios({ url: `${BASE_URL}/user/deleteMe`, method: "DELETE", withCredentials: true });

            if (res.statusText !== "Deleted") return;

            dispatch({ type: "user/deleted" });
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const updateMe = useCallback(async function (obj) {
        try {
            dispatch({ type: "loading" });

            const res = await axios({
                url: `${BASE_URL}/user/updateMe`,
                method: "PATCH",
                data: obj,
                withCredentials: true,
            });

            if (res.statusText !== "OK") return;

            dispatch({
                type: "user/updated",
                payload: { name: res.data.data.user.name, avatar: res.data.data.user.avatar },
            });
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const updatePassword = useCallback(async function (currentPassword, password, passwordConfirm) {
        try {
            dispatch({ type: "loading" });

            const res = await axios({
                url: `${BASE_URL}/user/updatePassword`,
                method: "PATCH",
                data: { currentPassword, password, passwordConfirm },
                withCredentials: true,
            });

            if (res.statusText !== "OK") return;
        } catch (err) {
            error("Red", err.response.data.message);
        } finally {
            dispatch({ type: "loaded" });
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            isAuthenticated,
            getUser,
            loginUser,
            signupUser,
            logoutUser,
            isLoading,
            deleteMe,
            updateMe,
            updatePassword,
        }),
        [
            getUser,
            isAuthenticated,
            isLoading,
            loginUser,
            logoutUser,
            signupUser,
            user,
            deleteMe,
            updateMe,
            updatePassword,
        ]
    );

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) throw new Error("UserContext was used outside of the UserProvider");

    return context;
}

export { UserProvider, useUser };
