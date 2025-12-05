import { encryptToString, hashValue } from "../../libs/crypto.js";
import { db } from "../../libs/knex.js";
import { toDbFromDto, toDtoFromRow } from "./carModel.mapper.js";

const TABLE = "car_models";
const IMG_TABLE = "car_model_images";

export const carModelRepository = {
    async create(dto) {
        const rowToInsert = toDbFromDto(dto);
        const [row] = await db(TABLE).insert(rowToInsert).returning("*");
        return toDtoFromRow(row);
    },

    async update(id, dto) {
        const rowToUpdate = toDbFromDto(dto);
        const [row] = await db(TABLE).where({ id }).update(rowToUpdate).returning("*");
        return toDtoFromRow(row);
    },

    async findById(id) {
        const row = await db(TABLE).where({ id }).first();
        if (!row) return null;
        return toDtoFromRow(row);
    },

    async remove(id) {
        await db(TABLE).where({ id }).del();
    },

    async list({ search, sortBy }) {
        let query = db(TABLE);

        if (search) {
            const searchHash = hashValue(search);
            console.log(searchHash);
            query.where(function () {
                this.whereILike("model_name", `%${search}%`).orWhere("model_code_hash", searchHash); // exact match
            });
        }

        // Sorting
        if (sortBy === "sortOrder") {
            query.orderBy("sort_order", "asc");
        } else if (sortBy === "manufacturingDate") {
            query.orderBy("dom_timestamp", "desc");
        } else {
            query.orderBy("created_at", "desc");
        }

        const rows = await query;
        const models = rows.map(toDtoFromRow);
        const ids = models.map((m) => m.id);

        if (ids.length === 0) return models;

        const images = await db(IMG_TABLE).whereIn("car_model_id", ids).select("car_model_id", "url", "is_default");

        return models.map((m) => ({
            ...m,
            images: images.filter((img) => img.car_model_id === m.id),
        }));
    },

    async addImages(carModelId, urls, defaultUrl) {
        const records = urls.map((url) => ({
            car_model_id: carModelId,
            url,
            is_default: url === defaultUrl,
        }));
        if (records.length) {
            await db(IMG_TABLE).insert(records);
            if (defaultUrl) {
                await db(TABLE).where({ id: carModelId }).update({ default_image_url: defaultUrl });
            }
        }
    },

    async listImages(carModelId) {
        return db(IMG_TABLE).where({ car_model_id: carModelId });
    },

    async clearImages(carModelId) {
        return db("car_model_images").where({ car_model_id: carModelId }).del();
    },
};
