import { carModelRepository } from "./carModel.repository.js";
import { NotFoundError } from "../../core/AppError.js";

export const carModelService = {
    async create(payload) {
        const dto = {
            brand: payload.brand,
            class: payload.class,
            modelName: payload.modelName,
            modelCode: payload.modelCode,
            description: payload.description,
            features: payload.features,
            price: payload.price,
            dateOfManufacturing: payload.dateOfManufacturing,
            active: payload.active,
            sortOrder: payload.sortOrder,
        };
        return carModelRepository.create(dto);
    },

    async update(id, payload) {
        const existing = await carModelRepository.findById(id);
        if (!existing) throw new NotFoundError("Car model not found");
        const merged = { ...existing, ...payload };
        return carModelRepository.update(id, merged);
    },

    async getById(id) {
        const model = await carModelRepository.findById(id);
        if (!model) throw new NotFoundError("Car model not found");
        return model;
    },

    async remove(id) {
        const exists = await carModelRepository.findById(id);
        if (!exists) throw new NotFoundError("Car model not found");

        await carModelRepository.clearImages(id);
        await carModelRepository.remove(id);
    },

    async list(query) {
        return carModelRepository.list(query);
    },

    async uploadImages(id, files) {
        const model = await carModelRepository.findById(id);
        if (!model) throw new NotFoundError("Car model not found");

        const urls = files.map((f) => `/uploads/${f.filename}`);
        const defaultUrl = urls[0];
        await carModelRepository.addImages(id, urls, defaultUrl);

        return { urls, defaultUrl };
    },
    async replaceImages(id, files) {
        const model = await carModelRepository.findById(id);
        if (!model) throw new NotFoundError("Car model not found");

        const urls = files.map((f) => `/uploads/${f.filename}`);
        const defaultUrl = urls[0];

        // Delete old images & store new ones
        await carModelRepository.clearImages(id);
        await carModelRepository.addImages(id, urls, defaultUrl);

        return { urls, defaultUrl };
    },
};
