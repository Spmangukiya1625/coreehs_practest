exports.up = function (knex) {
    return knex.schema.alterTable("car_models", (table) => {
        table.string("model_code_hash").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("car_models", (table) => {
        table.dropColumn("model_code_hash");
    });
};
