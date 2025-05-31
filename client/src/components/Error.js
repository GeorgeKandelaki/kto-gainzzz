import styles from "./Error.module.css";

export function hideAlert() {
	const alertEl = document.querySelector(".error");
	if (alertEl) document.body.removeChild(alertEl);
}

function error(type = "red", message) {
	hideAlert();
	// return <div className={`message message--${styles[type]}`}>{children}</div>;

	const error = document.createElement("div");
	error.innerHTML = message;
	error.className = `${styles.message} ${styles[`message${type}`]}`;
	document.body.append(error);

	const timeoutId = setTimeout(() => {
		error.remove();
	}, 5000);
}

export default error;
