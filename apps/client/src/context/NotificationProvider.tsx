import Notification from "@/components/feature/Notification";
import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
	id: number;
	type: "success" | "error" | "info" | "warning";
	message: string;
}

interface NotificationContextType {
	showNotification: (
		type: "success" | "error" | "info" | "warning",
		message: string
	) => void;
}

export const NotificationContext = createContext<
	NotificationContextType | undefined
>(undefined);

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotification must be used within NotificationProvider"
		);
	}
	return context;
};

let toastId = 0;

interface NotificationProviderProps {
	children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showNotification = (
		type: "success" | "error" | "info" | "warning",
		message: string
	) => {
		const id = toastId++;
		const newToast: Toast = { id, type, message };
		setToasts((prev) => [...prev, newToast]);
		setTimeout(() => {
			removeNotification(id);
		}, 4000);
	};

	const removeNotification = (id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			<div className="fixed top-15 flex-col p-10 left-0 flex items-center justify-center w-full space-y-2 z-50">
				{toasts.map((toast) => (
					<Notification
						key={toast.id}
						id={toast.id}
						type={toast.type}
						message={toast.message}
						onClose={() => removeNotification(toast.id)}
					/>
				))}
			</div>
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
