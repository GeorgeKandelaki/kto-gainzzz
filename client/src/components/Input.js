import styles from "./Input.module.css";

function Input({ value, setValue, type = "text" }) {
	return <input type={type} className={styles.input} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default Input;
