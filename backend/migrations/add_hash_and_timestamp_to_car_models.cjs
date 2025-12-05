exports.up = async function (knex) {
    // Add new columns ONLY if missing
    const hasHash = await knex.schema.hasColumn("car_models", "model_code_hash");
    const hasTimestamp = await knex.schema.hasColumn("car_models", "dom_timestamp");

    return knex.schema.alterTable("car_models", (table) => {
        if (!hasHash) table.string("model_code_hash", 64).index(); // sha256 => 64 chars
        if (!hasTimestamp) table.bigInteger("dom_timestamp").nullable().index();
    });
};

exports.down = async function (knex) {
    return knex.schema.alterTable("car_models", (table) => {
        table.dropColumn("model_code_hash");
        table.dropColumn("dom_timestamp");
    });
};
