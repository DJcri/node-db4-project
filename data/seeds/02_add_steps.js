exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("steps")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("steps").insert([
        {
          recipe_id: 1,
          step_id: 1,
          step_number: 1,
          step_instructions: "Step 1",
        },
        {
          recipe_id: 1,
          step_id: 2,
          step_number: 2,
          step_instructions: "Step 2",
        },
      ]);
    });
};
