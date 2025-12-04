exports.up = function (knex) {
    return knex.schema.createTable("salesmen", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.decimal("previous_year_sales", 15, 2).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("salesmen");
};
