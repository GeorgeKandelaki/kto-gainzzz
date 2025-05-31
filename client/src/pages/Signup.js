import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./Signup.module.css";
import { useUser } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
	const { signupUser } = useUser();
	// const navigate = useNavigate();

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (name.length < 4 || password.length < 8 || password.length < 8) return;

		signupUser(name, password, passwordConfirm);
		// navigate("/");
	}

	return (
		<main className={styles.signup}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.heading}>Sign up</h1>

				<div className={styles.formBox}>
					<label>Name</label>
					<Input value={name} setValue={setName} />
				</div>

				<div className={styles.formBox}>
					<label>Password</label>
					<Input value={password} setValue={setPassword} />
				</div>

				<div className={styles.formBox}>
					<label>Confirm Password</label>
					<Input value={passwordConfirm} setValue={setPasswordConfirm} />
				</div>

				<div className={styles.formSubmitBox}>
					<Link to="/login">Already Have an Account?</Link>
					<Button onClick={() => {}}>Sign Up</Button>
				</div>
			</form>
		</main>
	);
}

export default Signup;
