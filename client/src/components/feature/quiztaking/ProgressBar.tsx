
export const ProgressBar = ({progress} : {progress: number}) => {
	return (
		<div className="w-full h-3 rounded-full overflow-hidden bg-muted">
			<div
				className="h-full bg-custom rounded-full"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};
