require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Diet } = require('../db')
const datajson = require("../data.json")

const getDiets = async (req, res) => {
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&maxFat=100&number=100`, {
        headers: { "accept-encoding": "*" },
    })
    const dataDiets = dietsApi.data.results.map(el => el.diets)
    const diets1 = dataDiets.flat()
    const diets = [...new Set(diets1)]
    diets.forEach(el => {
        Diet.findOrCreate({
            where: { name: el }
        })
    })
    return diets
}

// const getDiets = async (req, res) => {

//     const dataDiets = datajson.results.map(el => el.diets)
//     const diets1 = dataDiets.flat()
//     const diets = [...new Set(diets1)]
//     diets.forEach(el => {
//         Diet.findOrCreate({
//             where: { name: el }
//         })
//     })
//     return diets
// }

module.exports = {
    getDiets
};