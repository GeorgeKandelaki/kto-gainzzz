import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./Signup.module.css";
import { useUser } from "../contexts/UserContext";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

function Signup() {
	const { signupUser } = useUser();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (name.length < 4 || password.length < 8 || password.length < 8) return;

		if (!(await signupUser(name, password, passwordConfirm))) return;
		navigate("/workouts");
	}

	return (
		<>
			<Header />
			<main className={styles.signup}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1 className={styles.heading}>Sign up</h1>

					<div className={styles.formBox}>
						<label>Name</label>
						<Input value={name} setValue={setName} />
					</div>

					<div className={styles.formBox}>
						<label>Password</label>
						<Input value={password} setValue={setPassword} type="password" />
					</div>

					<div className={styles.formBox}>
						<label>Confirm Password</label>
						<Input value={passwordConfirm} setValue={setPasswordConfirm} type="password" />
					</div>

					<div className={styles.formSubmitBox}>
						<Link to="/login">Already Have an Account?</Link>
						<Button onClick={() => {}}>Sign Up</Button>
					</div>
				</form>
			</main>
		</>
	);
}

export default Signup;
