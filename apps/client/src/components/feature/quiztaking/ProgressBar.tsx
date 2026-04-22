
export const ProgressBar = ({progress} : {progress: number}) => {
	return (
		<div className="w-full h-3 rounded-full overflow-hidden bg-base">
			<div
				className="h-full bg-brand rounded-full"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};
