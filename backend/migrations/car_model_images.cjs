exports.up = function (knex) {
    return knex.schema.createTable("car_model_images", (table) => {
        table.increments("id").primary();

        table.integer("car_model_id").unsigned().references("id").inTable("car_models").onDelete("CASCADE");

        table.string("url").notNullable();
        table.boolean("is_default").defaultTo(false);

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("car_model_images");
};
