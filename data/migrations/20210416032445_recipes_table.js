exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (table) => {
      table.increments("recipe_id");
      table.string("recipe_name", 128).notNullable().unique();
    })
    .createTable("ingredients", (table) => {
      table.increments("ingredient_id");
      table.string("ingredient_name", 128).notNullable().unique();
    })
    .createTable("steps", (table) => {
      table.increments("step_id");
      table.integer("step_number").notNullable();
      table.string("step_instructions", 128).notNullable();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
    })
    .createTable("step_ingredients", (table) => {
      table.increments("step_ingredients_id");
      table.float("quantity").notNullable();
      table
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("CASCADE");
      table
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("step_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};
