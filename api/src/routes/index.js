const {Router}  = require('express');
const { route } = require('./diets');
const diets = require('./diets')
const recipes = require('./recipes')
const filtered = require('../controllers/filtered')


const router = Router();

router.use('/diets', diets)
router.use('/recipes', recipes)
router.get("/filtered", filtered)

module.exports = router;
