import { BrowserRouter } from "react-router";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return (
		<HashRouter>
			<AppRoutes />
		</HashRouter>
	);
}

export default App;
