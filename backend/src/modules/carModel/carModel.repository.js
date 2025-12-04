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

        // We cannot search encrypted text, so we search in model_name only
        if (search) {
            query = query.whereILike("model_name", `%${search}%`);
        }

        if (sortBy === "date") {
            // sorting by decrypted date is tricky; store created_at as proxy for "latest"
            query = query.orderBy("created_at", "desc");
        } else if (sortBy === "sortOrder") {
            query = query.orderBy("sort_order", "asc");
        } else {
            query = query.orderBy("created_at", "desc"); // latest
        }

        const rows = await query;
        return rows.map(toDtoFromRow);
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
};
