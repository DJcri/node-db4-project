const db = require("../../data/db-config");

async function getRecipeById(recipe_id) {
  const steps = await db("recipes as r")
    .leftJoin("steps as st", "r.recipe_id", "st.recipe_id")
    .leftJoin("step_ingredients as st_i", "st.step_id", "st_i.step_id")
    .leftJoin("ingredients as i", "st_i.ingredient_id", "i.ingredient_id")
    .where("r.recipe_id", recipe_id)
    .select("r.recipe_id", "r.recipe_name", "st.*", "i.*", "st_i.quantity")
    .orderBy("step_number");

  // {
  //   "recipe_id" : 1,
  //   "recipe_name": "Spaghetti Bolognese",
  //   "created_at": "2021-01-01 08:23:19.120",
  //   "steps": [
  //     {
  //       "step_id": 11,
  //       "step_number": 1,
  //       "step_instructions": "Put a large saucepan on a medium heat",
  //       "ingredients": []
  //     },
  //     {
  //       "step_id": 12,
  //       "step_number": 2,
  //       "step_instructions": "Add 1 tbsp olive oil",
  //       "ingredients": [
  //         { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
  //       ]
  //     },
  //   ]
  // }

  const stepStorage = [];

  steps.forEach((st) => {
    const existing = stepStorage.find((step) => {
      return st.step_id === step.step_id;
    });
    let newIngredient = null;
    if (st.ingredient_id) {
      newIngredient = {
        ingredient_id: st.ingredient_id,
        ingredient_name: st.ingredient_name,
        quantity: st.quantity,
      };
    }
    if (existing && newIngredient) {
      existing.ingredients.push(newIngredient);
    }
    if (!existing) {
      stepStorage.push({
        step_id: st.step_id,
        step_number: st.step_number,
        step_instructions: st.step_instructions,
        ingredients: newIngredient ? [newIngredient] : [],
      });
    }
  });

  const r = {
    recipe_id: steps[0].recipe_id,
    recipe_name: steps[0].recipe_name,
    steps: [],
  };

  for (let [step_id, st] of Object.entries(stepStorage)) {
    r.steps.push({
      step_id: step_id,
      step_number: st.step_number,
      step_instructions: st.step_instructions,
      ingredients: st.ingredients,
    });
  }

  return r;
}

module.exports = { getRecipeById };
