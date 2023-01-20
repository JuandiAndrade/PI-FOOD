require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db')
const datajson = require("../data.json")


// const get_Api_Recipes = async () => {
// 	const dataApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&maxFat=100&number=100`, {
// 		headers: { "accept-encoding": "*" },
// 	})
// 	const recipes = dataApi.data.results.map(el => {
// 		return {
// 			id: el.id,
// 			name: el.title,
// 			healthScore: el.healthScore,
// 			image: el.image,
// 			summary: el.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
// 			diets: el.diets,
// 			steps: el.analyzedInstructions[0]?.steps.map(el => {
// 				return {
// 					number: el.number,
// 					step: el.step,
// 				}
// 			}),
// 			dishTypes: el.dishTypes
// 		}
// 	})
// 	return recipes
// }

const get_Api_Recipes = async () => {
	const recipes = datajson.results.map(el => {

		var steps = el.analyzedInstructions[0]?.steps.map(el => {
			return {
				number: el.number,
				step: el.step,
			}
		})

		return {
			id: el.id,
			name: el.title,
			healthScore: el.healthScore,
			image: el.image,
			summary: el.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
			diets: el.diets,
			dishTypes: el.dishTypes,
			steps: steps ? steps : []
		}
	})
	return recipes
}

const get_Db_Info = async () => {
	return await Recipe.findAll({
		include: {
			model: Diet,
			attributes: ['name'],
			through: {
				attributes: []
			}
		}
	})
};

const get_Db_Recipes = async () => {
	const recipes2 = await get_Db_Info()
	const recipes3 = recipes2.map(el => {
		return {
			id: el.id,
			name: el.name,
			healthScore: el.healthScore,
			image: el.image,
			summary: el.summary,
			diets: el.diets.map(el => el.name),
			steps: el.steps,
			dishTypes: el.dishTypes,
			createdInDb: el.createdInDb

		}
	})
	return recipes3
}

const get_All_Recipes = async () => {
	const apiInfo = await get_Api_Recipes();
	const dbInfo = await get_Db_Recipes();
	const infoTotal = apiInfo.concat(dbInfo);
	return infoTotal;
}


module.exports = {
	get_All_Recipes,
	get_Api_Recipes,
	get_Db_Recipes
}