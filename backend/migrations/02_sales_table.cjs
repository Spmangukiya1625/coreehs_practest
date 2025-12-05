exports.up = function (knex) {
    return knex.schema.hasTable("sales").then((exists) => {
        if (!exists) {
            return knex.schema.createTable("sales", (table) => {
                table.increments("id").primary();
                table.integer("salesman_id").references("id").inTable("salesmen").onDelete("CASCADE");
                table.string("class").notNullable(); // A / B / C
                table.string("brand").notNullable(); // Audi, Jaguar...
                table.integer("quantity").notNullable().defaultTo(0);
                table.decimal("price", 12, 2).notNullable().defaultTo(0);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("sales");
};
