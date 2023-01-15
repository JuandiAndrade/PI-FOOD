const { Router } = require('express');
const { getDiets } = require("../controllers/diets")

const router = Router();


router.get('/', async (req, res) => {
	try {
		const diet2 = await getDiets();
		res.status(200).send(diet2);
	} catch (error) {
		res.status(400).send("no se encontro ruta diets");
	};
});

module.exports = router;