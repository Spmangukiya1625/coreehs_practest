import { encryptToString, decryptFromString } from "../../libs/crypto.js";
import { buildCarModelDTO } from "./carModel.dto.js";

export function toDbFromDto(dto) {
    return {
        brand: dto.brand,
        class: dto.class,
        model_name: dto.modelName,
        model_code_enc: encryptToString(dto.modelCode),
        description_enc: encryptToString(dto.description),
        features_enc: encryptToString(dto.features),
        price_enc: encryptToString(dto.price),
        dom_enc: encryptToString(dto.dateOfManufacturing),
        active: dto.active ?? true,
        sort_order: dto.sortOrder ?? null,
    };
}

export function toDtoFromRow(row) {
    const decrypted = {
        modelCode: decryptFromString(row.model_code_enc),
        description: decryptFromString(row.description_enc),
        features: decryptFromString(row.features_enc),
        price: decryptFromString(row.price_enc),
        dom: decryptFromString(row.dom_enc),
    };
    return buildCarModelDTO(row, decrypted);
}
