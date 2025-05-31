import styles from "./Input.module.css";

function Input({ value, setValue }) {
	return <input className={styles.input} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default Input;
