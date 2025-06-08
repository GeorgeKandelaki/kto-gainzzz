import styles from "./Input.module.css";

function Input({ value, setValue, type = "text", placeholder = "" }) {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={styles.input}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default Input;
