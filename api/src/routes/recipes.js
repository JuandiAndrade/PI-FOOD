const { Router } = require('express');
const { get_All_Recipes, get_Api_Recipes, get_Db_Recipes } = require("../controllers/recipes")
const { Recipe, Diet } = require('../db')

const router = Router();

router.get('/', async (req, res) => {
	const name = req.query.name;
	const info = await get_All_Recipes();
	if (name) {
		const recipeName = info.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
		recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No se encotro receta');
	} else res.status(200).send(info);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const recipes = await get_All_Recipes()
	if (id) {
		let recipesId = recipes.filter(el => el.id == id)
		recipesId.length ? res.status(200).json(recipesId) : res.status(404).send('No se encontro receta');
	}
})

router.get('/db', async (req, res) => {
    const info = await get_Db_Recipes();
    try {
        res.status(200).send(info);
    } catch (error) {
        res.status(400).send("no se cargaron las recetas de la base de datos");
    };
});

// router.get('/api', async (req, res) => {
//     const info = await get_Api_Recipes();
//     try{
//         res.status(200).send(info);
//     }catch(error){
//         res.status(400).send("no se cargaron las recetas de la base de la api");
//     };
// });

router.post('/', async (req, res) => {
	try {
		const { name, image, summary, healthScore, steps, diets, dishTypes, createdInDb } = req.body;

		const [recipe, bool] = await Recipe.findOrCreate({
			where: { name },
			defaults: {
				name,
				image:  image?image:"https://i.pinimg.com/564x/7f/a3/5e/7fa35e59edae324e0545e76108ca3a06.jpg",
				summary,
				healthScore,
				steps,
				dishTypes,
				createdInDb,
			},
			include: {
				model: Diet,
			},
		});
		if (bool) {
			const dietDb = await Diet.findAll({ where: { name: diets } });
			await recipe.addDiets(dietDb);
			return res.status(200).json(recipe);
		} else {
			return res.status(200).json({ "error": "exists" })
		}
	} catch (error) {
		res.status(400).send("No se pudo crear receta");
	}
})


router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        let rec = await Recipe.destroy({
            where: {
                id: id
            }
        });
        return res.json({ borrado: true })
    } catch (error) {
        console.log(error)
    }
})

router.put("/:id", async (req, res) => {   ///////NO LO ESTOY USANDO EN EL FRONT////////
    const id = req.params.id
    const recipe = req.body
        try {
        let reci = await Recipe.update(recipe, {
            where: {
                id: id
            }
        });
        return res.json({ cambiado: true })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;