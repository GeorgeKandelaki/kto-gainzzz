exports.getBase = async (req, res, next) => {
	return res.status(200).render("base", { title: "Home" });
};
