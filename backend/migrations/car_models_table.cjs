exports.up = function (knex) {
    return knex.schema.createTable("car_models", (table) => {
        table.increments("id").primary();
        table.string("brand").notNullable();
        table.string("class").notNullable();
        table.string("model_name").notNullable();

        // encrypted fields stored as text
        table.text("model_code_enc").notNullable();
        table.text("description_enc").notNullable();
        table.text("features_enc").notNullable();
        table.text("price_enc").notNullable();
        table.text("dom_enc").notNullable();

        table.boolean("active").defaultTo(true);
        table.integer("sort_order").defaultTo(0);
        table.string("default_image_url").nullable();

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("car_models");
};
