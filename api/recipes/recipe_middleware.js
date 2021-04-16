const Recipe = require("./recipe_model");

const validateId = async (req, res, next) => {
  const { recipe_id } = req.params;
  const recipe = await Recipe.getRecipeById(recipe_id);
  if (!recipe) {
    res.status(404).json({ message: "recipe doesn't exist" });
  } else {
    req.recipe = recipe;
    next();
  }
};

module.exports = { validateId };
