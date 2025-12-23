import React from 'react';
import { motion } from 'motion/react';
import * as Fa from 'react-icons/fa6';

interface NotificationProps {
	id: number;
	type: "success" | "error" | "info" | "warning";
	message: string;
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({type, message, onClose }) => {
	const getIcon = () => {
		switch (type) {
			case 'success':
				return <Fa.FaCircleCheck />;
			case 'error':
				return <Fa.FaCircleXmark />;
			case 'info':
				return <Fa.FaCircleInfo />;
			case 'warning':
				return <Fa.FaTriangleExclamation />;
		}
	};

	const getBgColor = () => {
		switch (type) {
			case 'success':
				return 'bg-green-500/20 border-green-500';
			case 'error':
				return 'bg-red-500/20 border-red-500';
			case 'info':
				return 'bg-blue-500/20 border-blue-500';
			case 'warning':
				return 'bg-yellow-500/20 border-yellow-500';
		}
	};

	const getTextColor = () => {
		switch (type) {
			case 'success':
				return 'text-green-500';
			case 'error':
				return 'text-red-500';
			case 'info':
				return 'text-blue-500';
			case 'warning':
				return 'text-yellow-500';
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			className={`flex items-center gap-3 p-4 rounded-lg border ${getBgColor()} backdrop-blur-sm`}
		>
			<span className={getTextColor()}>{getIcon()}</span>
			<p className="text-sm text-white flex-1">{message}</p>
			<button
				onClick={onClose}
				className="text-white/60 hover:text-white transition"
			>
				<Fa.FaXmark />
			</button>
		</motion.div>
	);
};

export default Notification;
