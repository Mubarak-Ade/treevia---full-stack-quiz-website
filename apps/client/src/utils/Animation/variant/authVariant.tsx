export const focusVariant = {
	initial: {
		scale: 1,
		border: "2px solid",
		boxShadow: "0 0 0 3px #0001",
		background: "white",
	},
	animate: {
		scale: 1.02,
		border: "2px solid #52b788",
		boxShadow: "0 0 0 3px rgba(82, 183, 136, 0.1)",
		background: "rgb(225, 225, 225)",
	},
	transparent: {
		type: "spring",
		stiffness: 300
	}
}

export const submitVariant = {
	animate: {
		// scale: 1.03,
		boxShadow: "0 0 20px 5px rgba(82, 183, 136, 0.5)",
	},
	transition: {
		type: "spring",
		stiffness: 300
	}
}