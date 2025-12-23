import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router";

const SuccessPage = ({ activeTab }: { activeTab: string }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (activeTab === "success") {
			const timer = setTimeout(() => {
				navigate("/");
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [activeTab, navigate]);

	return (
		<div
			className={`${
				activeTab === "success" ? "block" : "hidden"
			} flex flex-col items-center justify-center`}
		>
			<AiFillCheckCircle className="text-custom text-9xl" />
			<h2 className="text-custom font-bold text-xl">Success! 👍</h2>
			<p className="text-center font-semibold text-secondary">
				Welcome back!!! you will be redirected to your dashboard
			</p>
		</div>
	);
};

export default SuccessPage;
