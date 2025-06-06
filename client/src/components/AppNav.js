import styles from "./AppNav.module.css";

import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import { useUser } from "../contexts/UserContext";

function AppNav() {
	const { user } = useUser();
	const navigate = useNavigate();

	return (
		<nav className={styles.nav}>
			<div className={styles.navLogo}>
				<Logo />
				<p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
					KTOGainzzz
				</p>
			</div>

			<ul>
				<li>
					<NavLink to="workouts" className={styles.workoutsLink}>
						WORKOUTS
					</NavLink>
				</li>
				{!user ? (
					<li>
						<NavLink to="login" className={styles.ctaLink}>
							Login
						</NavLink>
					</li>
				) : (
					""
				)}
			</ul>
		</nav>
	);
}

export default AppNav;
