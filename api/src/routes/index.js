const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe, Diet } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const dataApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&maxFat=20&number=20`, {
        headers: { "accept-encoding": "*" },
    })
    const data = dataApi.data.results.map(el => {
        return {
            id: el.id,
            name: el.title,
            healthScore: el.healthScore,
            image: el.image,
            summary: el.summary,
            diets: el.diets,
            steps: el.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    step: el.step,
                }
            }),
            dishTypes: el.dishTypes
        }
    })
    return data

}
const getDbRecipes = async () => {
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




// ------------PARA SACAR LOS OBJETOS DEL ARRAY DIETS--------------------
const getDbRecipes2 = async ()=>{
    const recipes2 = await getDbRecipes()
    const recipes3 = recipes2.map(el => {
        return {
                id: el.id,
                name: el.name,
                healthScore: el.healthScore,
                image: el.image,
                summary: el.summary,
                diets: el.diets.map(el => el.name),
                steps: el.steps,
                dishTypes: el.dishTypes
        }
    })
    return recipes3
}
// -----------------------------------------------------------------------





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
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbRecipes();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/diets', async (req, res) => {
    try {
        const diet2 = await getDiets()
        res.status(200).send(diet2)
    } catch (error) {
        res.status(400).send("no se encontro ruta diets")
    }
})

router.get('/recipes', async (req, res) => {
    const name = req.query.name;
    const info = await getAllRecipes()
    if (name) {
        const recipeName = await info.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No está la receta');
    } else res.status(200).send(info)
})

// ----------------------------------------PROBANDO Y FORME UN ARRAY DE DIETAS CON getDbRecipes2()-----------

// router.get('/db', async (req, res) => {
//     const info = await getDbRecipes2()
//     try{
//         res.status(200).send(info)
//     }catch(error){
//         console.log(error)
//     }
// })
//----------------------------------------------------------------------------------------------------------


// router.get('/api', async (req, res) => {
//     const info = await getApiInfo()
//     try{
//         res.status(200).send(info)
//     }catch(error){
//         console.log(error)
//     }
// })

router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipes = await getDbRecipes()
    if (id) {
        let recipesId = await recipes.filter(el => el.id == id)
        recipesId.length ? res.status(200).json(recipesId) : res.status(404).send('No se encontro receta');
    }
})

router.post('/recipes', async (req, res) => {
    const { name, image, summary, healthScore, steps, diets, createdInDb } = req.body;
    const recipe = {
        name,
        image,
        summary,
        healthScore,
        steps,
        createdInDb,
    }
    const createRecipe = await Recipe.create(recipe)
    const dietDb = await Diet.findAll({ where: { name: diets } })
    createRecipe.addDiets(dietDb)
    res.send('Receta creada con éxito')
})

// const filtered_db_or_api = async function (req, res) {
//     try {
//         const dbApi  = req.query.dbApi
//         let result;
//         const apiInfo = await getApiInfo();
//         const dbInfo = await getDbRecipes();
//         const allInfo = await getAllRecipes()
//         if (dbApi === "api") {
//             result = apiInfo
//         }
//         if (dbApi === "db") {
//             result = dbInfo
//         }
//         if (dbApi === "all") {
//             result = allInfo
//         }
//         console.log("APROVADO")
//         console.log(dbApi)
//         res.json(result)
//     } catch (error) {
//         console.log(dbApi)
//         res.status(400).send("no se encontro filtro")
//     }
// }

router.get('/filtered', async (req, res) => {
    try {
        const {dbApi, type}  = req.query
        let result;
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbRecipes2();
        // const allInfo = await getAllRecipes();
        const allInfo = dbInfo.concat(apiInfo);
        if (dbApi === "api") {
            result = apiInfo
        }
        if (dbApi === "db") {
            result = dbInfo
        }
        if (dbApi === "all") {
            result = allInfo
        }
        // if(type !== "all"){
        //     result = allInfo.filter(el => el.diets.includes(type))
        // }
        

        console.log("APROVADO")
        console.log( req.query)
        res.json(result)

    } catch (error) {
        console.log( req.query)
        res.status(400).send("no se encontro filtro")
    }

    
    // try {
    //     const filter =  await filtered_db_or_api()
    //     res.status(200).send(filter)
    // } catch (error) {
    //     res.status(400).send("no se encontro ruta diets")
    // }
})

router.get('/filtered2', async (req, res) => {
    try {
        const { type }  = req.query
        let result;
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbRecipes2();
        // const allInfo = await getAllRecipes();
        const allInfo = dbInfo.concat(apiInfo);

        if(type !== "all"){
            result = allInfo.filter(el => el.diets.includes(type))
        }
        if(type === "Diets:"){
            result = allInfo
        }
        // if(type !== "all"){
        //     result = allInfo.filter(el => el.diets.includes(type))
        // }


        console.log("APROVADO")
        // console.log(dbApi)
        res.json(result)

    } catch (error) {
        // console.log(type)
        res.status(400).send("no se encontro filtro")
    }

})



router.get('/filtered3', async (req, res) => {
    try {
        const { order }  = req.query
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbRecipes2();
        // const allInfo = await getAllRecipes();
        const allInfo = dbInfo.concat(apiInfo);

        if (order === "az") {
            allInfo.sort(function (a, b) {
              // A Z
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
            allInfo.sort(function (a, b) {
              // Z A
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
            allInfo.sort(function (a, b) {
              // A Z
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
            allInfo.sort(function (a, b) {
              // Z A
              if (a.healthScore < b.healthScore) {
                return 1;
              }
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              return 0;
            });
          }

        console.log("APROVADO")
        // console.log(dbApi)
        res.json(allInfo)

    } catch (error) {
        // console.log(type)
        res.status(400).send("no se encontro filtro")
    }

})







module.exports = router;
