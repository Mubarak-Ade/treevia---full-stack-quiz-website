import Logo from "../../assets/logos.png";

interface Props {
	label: string,
	onClick: () => void,
	icon: React.ReactNode
}

export const QuizHeader = ({icon, label, onClick} : Props) => {
	return (
		<div className="flex items-center justify-between p-3 border-b border-muted">
			<div className="flex gap-4 items-center">
				<img
					className="size-10 rounded-full"
					src={Logo}
					alt="Logo"
				/>
				<h1 className={`text-4xl font-pacifico text-white`}>Treevia</h1>
			</div>
			<button onClick={onClick} className="flex font-ubuntu items-center text-xs gap-2 bg-secondary/40 text-white font-bold rounded-full px-3 py-2 cursor-pointer">
				{icon}{label}
			</button>
		</div>
	);
};
