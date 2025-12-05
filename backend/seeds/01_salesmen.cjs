/**
 * Seed Salesmen Table
 */
exports.seed = async function (knex) {
    await knex("salesmen").del();

    await knex("salesmen").insert([
        { id: 1, name: "John Smith", previous_year_sales: 490000 },
        { id: 2, name: "Richard Porter", previous_year_sales: 1000000 },
        { id: 3, name: "Tony Grid", previous_year_sales: 650000 },
    ]);
};
