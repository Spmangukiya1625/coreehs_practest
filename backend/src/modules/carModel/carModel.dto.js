export function buildCarModelDTO(row, decryptedFields) {
    return {
        id: row.id,
        brand: row.brand,
        class: row.class,
        modelName: row.model_name,
        modelCode: decryptedFields.modelCode,
        description: decryptedFields.description,
        features: decryptedFields.features,
        price: Number(decryptedFields.price),
        dateOfManufacturing: decryptedFields.dom,
        active: row.active,
        sortOrder: row.sort_order,
        defaultImageUrl: row.default_image_url,
    };
}
