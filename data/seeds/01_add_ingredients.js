exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { ingredient_id: 1, ingredient_name: "Sausage" },
        { ingredient_id: 2, ingredient_name: "Pepperoni" },
      ]);
    });
};
