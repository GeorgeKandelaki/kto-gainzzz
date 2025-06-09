import styles from "./AppNav.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

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

			{!user ? (
				<ul>
					<li>
						<NavLink to="login" className={styles.ctaLink}>
							Login
						</NavLink>
					</li>
				</ul>
			) : (
				<div className={styles.profile}>
					<Link to="/profile">
						<img src={user.avatar} alt="User profile" />
					</Link>
					<p>{user.name.split(" ")[0].toUpperCase()}</p>
				</div>
			)}
		</nav>
	);
}

export default AppNav;
