import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import NotificationProvider from "./context/NotificationProvider";

const queryClient = new QueryClient()

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<NotificationProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</NotificationProvider>
	);
}
