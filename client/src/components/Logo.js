import { Link } from "react-router";
import styles from "./Logo.module.css";

function Logo() {
	return <img src="/icons/logo.png" alt="Logo of our website" className={styles.logo} />;
}

export default Logo;
