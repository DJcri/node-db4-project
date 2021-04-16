exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("step_ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("step_ingredients").insert([
        {
          step_ingredients_id: 1,
          step_id: 1,
          ingredient_id: 1,
          quantity: 1.5,
        },
        {
          step_ingredients_id: 2,
          step_id: 1,
          ingredient_id: 2,
          quantity: 5,
        },
      ]);
    });
};
