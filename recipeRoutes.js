const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Routes for recipes
router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.get('/search', recipeController.searchRecipes);

module.exports = router;