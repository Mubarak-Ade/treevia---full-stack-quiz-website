import { Link } from "react-router";
import Logo from "../../../assets/logo.png";

interface Props {
	label: string,
	timeLimit?: number,
	onClick: () => void,
	icon: React.ReactNode,
}

export const QuizHeader = ({icon, label, onClick, timeLimit} : Props) => {


	const normalizedTime = typeof timeLimit === "number" ? timeLimit : 0;
	const minutes = Math.floor(normalizedTime / 60)

	const seconds = normalizedTime % 60
	

	return (
		<div className="flex items-center justify-between p-3 border-b border-muted">
			<Link to="/" className="flex gap-4 items-center">
				<img
					className="size-10 rounded-full"
					src={Logo}
					alt="Logo"
				/>
				<h1 className={`md:text-4xl text-3xl font-pacifico text-white`}>Treevia</h1>
			</Link>
			<div className="flex gap-4 items-center">
				<div className="text-white bg-red-800 px-4 py-1 font-bold rounded-full">
					<p>{minutes}:{seconds.toString().padStart(2, "0")}</p>
				</div>
				<button onClick={onClick} className="flex font-ubuntu items-center text-xs gap-2 bg-secondary/40 text-white font-bold rounded-full px-3 py-2 cursor-pointer">
					{icon}{label}
				</button>
			</div>
		</div>
	);
};
