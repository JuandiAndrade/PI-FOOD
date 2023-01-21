const { get_Api_Recipes, get_Db_Recipes } = require("./recipes")

const filtered = async function (req, res) {
	try {
		const { dbApi, type, order } = req.query
		let result;
		const apiInfo = await get_Api_Recipes();
		const dbInfo = await get_Db_Recipes();
		if (dbApi === "api") {
			result = apiInfo
		}
		if (dbApi === "db") {
			result = dbInfo
		}
		if (dbApi === "all") {
			result = apiInfo.concat(dbInfo)
		}
		if (order === "az") {
			result.sort(function (a, b) {

				if (a.name > b.name) {
					return 1;
				}
				if (a.name < b.name) {
					return -1;
				}
				return 0;
			});
		}
		if (order === "za") {
			result.sort(function (a, b) {

				if (a.name < b.name) {
					return 1;
				}
				if (a.name > b.name) {
					return -1;
				}
				return 0;
			});
		}
		if (order === "minMax") {
			result.sort(function (a, b) {

				if (a.healthScore > b.healthScore) {
					return 1;
				}
				if (a.healthScore < b.healthScore) {
					return -1;
				}
				return 0;
			});
		}
		if (order === "maxMin") {
			result.sort(function (a, b) {

				if (a.healthScore < b.healthScore) {
					return 1;
				}
				if (a.healthScore > b.healthScore) {
					return -1;
				}
				return 0;
			});
		}
		if (type) {
			console.log("all")
			result = result.filter(el => el.diets.includes(type))
		}

		console.log(req.query)
		res.json(result)
	} catch (error) {
		console.log(req.query)
		res.status(400).send("no se encontro filtro")
	}
}

module.exports = filtered;