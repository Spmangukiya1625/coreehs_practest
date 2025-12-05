exports.seed = async function (knex) {
    await knex("car_models").del();

    await knex("car_models").insert([
        {
            id: 1,
            brand: "Audi",
            class: "A-Class",
            model_name: "Sample A1",
            model_code_enc: "encrypted-placeholder",
            description_enc: "encrypted-placeholder",
            features_enc: "encrypted-placeholder",
            price_enc: "encrypted-placeholder",
            dom_enc: "encrypted-placeholder",
            active: true,
            sort_order: 1,
            default_image_url: null,
        },
    ]);
};
