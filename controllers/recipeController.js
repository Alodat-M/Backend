// Dummy data for recipes
let recipes = [
    {
        id: 1,
        name: "Pasta Carbonara",
        ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan cheese", "Black pepper"],
        instructions: "Cook spaghetti. Mix eggs, bacon, cheese, and pepper. Combine with cooked spaghetti.",
        cookingTime: "20 minutes",
        cuisine: "Italian",
        nutritionalInformation: {
            calories: 450,
            fat: 20,
            protein: 25,
            carbs: 40
        },
        allergens: ["Gluten", "Dairy"]
    }
];

// Controller function to get all recipes
const getAllRecipes = (req, res, next) => {
    try {
        res.json(recipes);
    } catch (err) {
        next(err);
    }
};

// Controller function to create a new recipe
const createRecipe = (req, res, next) => {
    try {
        const newRecipe = req.body;
        // Check if all required fields are provided
        const requiredFields = ['name', 'ingredients', 'instructions', 'cookingTime', 'cuisine', 'nutritionalInformation', 'allergens'];
        for (const field of requiredFields) {
            if (!newRecipe[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }
        // Assign a unique ID to the new recipe
        const id = recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1;
        newRecipe.id = id;
        recipes.push(newRecipe);
        res.status(201).json(newRecipe);
    } catch (err) {
        next(err);
    }
};

// Controller function to get a recipe by ID
const getRecipeById = (req, res, next) => {
    try {
        const recipeId = parseInt(req.params.id);
        const recipe = recipes.find(recipe => recipe.id === recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        next(err);
    }
};

// Controller function to update a recipe by ID
const updateRecipe = (req, res, next) => {
    try {
        const recipeId = parseInt(req.params.id);
        const updatedRecipe = req.body;
        // Find the index of the recipe to be updated
        const index = recipes.findIndex(recipe => recipe.id === recipeId);
        if (index === -1) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Merge updated fields into the existing recipe
        recipes[index] = { ...recipes[index], ...updatedRecipe };
        res.json(recipes[index]);
    } catch (err) {
        next(err);
    }
};

// Controller function to delete a recipe by ID
const deleteRecipe = (req, res, next) => {
    try {
        const recipeId = parseInt(req.params.id);
        const index = recipes.findIndex(recipe => recipe.id === recipeId);
        if (index === -1) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        recipes.splice(index, 1);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

// Controller function to search recipes
const searchRecipes = (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        // Perform search based on query (e.g., name, ingredients, cuisine)
        const results = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase())) ||
            recipe.cuisine.toLowerCase().includes(query.toLowerCase())
        );
        res.json(results);
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllRecipes, createRecipe, getRecipeById, updateRecipe, deleteRecipe, searchRecipes };