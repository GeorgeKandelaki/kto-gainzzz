import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

function Modal({
	onClickNo,
	onClickYes,
	heading = "Are You Sure?",
	description = "Are you sure you want to do this action? By clicking YES you will agree without being able to undo the action.",
}) {
	const [show, setShow] = useState(true);

	useEffect(
		function () {
			function handleKeyDown(e) {
				if (e.key === "Escape") {
					setShow(false);
					onClickNo?.(); // optional chaining = clean
				}
			}

			document.body.addEventListener("keydown", handleKeyDown);

			return () => document.body.removeEventListener("keydown", handleKeyDown);
		},
		[onClickNo]
	);

	return show ? (
		<>
			<div
				className={styles.modal}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-heading"
				aria-describedby="modal-description"
			>
				<h3 id="modal-heading" className={styles.modalHeading}>
					{heading}
				</h3>
				<p id="modal-description" className={styles.modalDescription}>
					{description}
				</p>

				<div className={styles.btns}>
					<button
						className={`btn ${styles.btnNo}`}
						onClick={() => {
							setShow(false);
							onClickNo?.();
						}}
					>
						NO
					</button>
					<button
						className={`btn ${styles.btnYes}`}
						onClick={() => {
							setShow(false);
							onClickYes?.();
						}}
					>
						YES
					</button>
				</div>
			</div>
			<div className={styles.overlay}></div>
		</>
	) : (
		""
	);
}

export default Modal;
