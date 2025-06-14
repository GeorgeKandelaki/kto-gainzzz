import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

import "./index.css";
import { UserProvider } from "./contexts/UserContext";

// axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);
