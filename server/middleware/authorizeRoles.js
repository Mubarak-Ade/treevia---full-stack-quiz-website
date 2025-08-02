const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(401).json("Access Denied")
		}
		next()
	}
};

export default authorizeRoles