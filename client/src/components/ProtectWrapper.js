import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useUser } from "../contexts/UserContext";

function ProtectWrapper() {
	const { user, isLoading } = useUser();

	if (isLoading) return <Spinner />;
	if (!user) return <Navigate to="/login" />;

	return <Outlet />;
}

// function ProtectRoute({ user, redirectPath = "/", children }) {
// 	if (!user) return <Navigate to={redirectPath} replace />;
// 	return children ? children : <Outlet />;
// }

export default ProtectWrapper;
