import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

import { useUser } from "../contexts/UserContext";

import styles from "./Login.module.css";

function Login() {
	const { loginUser } = useUser();
	// const navigate = useNavigate();

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (name.length < 4 || password.length < 8) return;

		if (await loginUser(name, password));
		// navigate("/");
	}

	return (
		<main className={styles.login}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.heading}>Login</h1>

				<div className={styles.formBox}>
					<label>Name</label>
					<Input value={name} setValue={setName} />
				</div>

				<div className={styles.formBox}>
					<label>Password</label>
					<Input value={password} setValue={setPassword} />
				</div>

				<div className={styles.formSubmitBox}>
					<Link to="/signup">Don't have an Account?</Link>
					<Button onClick={() => {}}>Login</Button>
				</div>
			</form>
		</main>
	);
}

export default Login;
