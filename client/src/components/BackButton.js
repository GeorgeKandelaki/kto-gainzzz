import styles from "./BackButton.module.css";

import { useNavigate } from "react-router-dom";

function BackButton({ children, className = "" }) {
	const navigate = useNavigate();

	return (
		<button className={`btn ${styles.btnBack} ${className}`} onClick={() => navigate(-1)}>
			{children}
		</button>
	);
}

export default BackButton;
