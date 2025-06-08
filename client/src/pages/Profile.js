import { useUser } from "../contexts/UserContext";
import styles from "./Profile.module.css";

import Spinner from "../components/Spinner";
import AppNav from "../components/AppNav";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Input from "../components/Input";

import { useState } from "react";

function Profile() {
	const { user, isLoading } = useUser();

	const [image, setImage] = useState("");
	const [name, setName] = useState(user.name);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

	if (isLoading) return <Spinner />;

	function handleNameAndImageSubmit() {}

	function handlePasswordSubmit() {}

	function handleDeleteAccount() {}

	function handleLogout() {}

	return (
		<>
			<AppNav />
			<main className={styles.profile}>
				<BackButton className={styles.btnBack}>Go Back</BackButton>

				<section className={styles.profileSection}>
					<form onSubmit={handleNameAndImageSubmit} className={styles.formImageName}>
						<div className={styles.formImage}>
							<img src={user.avatar} alt="Users profile" />
							<div className={styles.formField}>
								<label>Choose an Image</label>
								<input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
							</div>
						</div>

						<div className={styles.formField}>
							<label>Name</label>
							<Input value={name} setValue={setName} />
						</div>

						<Button>Confirm Update</Button>
					</form>

					<form onSubmit={handlePasswordSubmit} className={styles.formPassword}>
						<div className={styles.formField}>
							<label>Your Current Password</label>
							<Input value={currentPassword} setValue={setCurrentPassword} type="password" />
						</div>

						<div className={styles.formField}>
							<label>New Password</label>
							<Input value={newPassword} setValue={setNewPassword} type="password" />
						</div>

						<div className={styles.formField}>
							<label>Confirm New Password</label>
							<Input value={newPasswordConfirm} setValue={setNewPasswordConfirm} type="password" />
						</div>

						<Button>Confirm Update</Button>
					</form>

					<div className={styles.accountActions}>
						<button className={`btn ${styles.btnDelete}`} onClick={handleDeleteAccount}>
							Delete Account
						</button>
						<button className={`btn ${styles.btnLogout}`} onClick={handleLogout}>
							Logout
						</button>
					</div>
				</section>
			</main>
		</>
	);
}

export default Profile;
