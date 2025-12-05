import { carModelService } from "./carModel.service.js";
import { ok } from "../../core/ApiResponse.js";

export const carModelController = {
    async create(req, res, next) {
        try {
            const files = req.files || [];

            const model = await carModelService.create(req.body);

            if (files.length > 0) {
                await carModelService.uploadImages(model.id, files);
            }

            return res.json(ok(model, "Car model created"));
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const id = Number(req.params.id);

            // Update basic fields
            const updated = await carModelService.update(id, req.body);

            // If images uploaded → replace old ones
            const files = req.files || [];
            if (files.length > 0) {
                await carModelService.replaceImages(id, files);
            }

            res.json(ok(updated, "Car model updated"));
        } catch (err) {
            next(err);
        }
    },

    async get(req, res, next) {
        try {
            const id = Number(req.params.id);
            const model = await carModelService.getById(id);

            return res.json(ok(model, "Car model details"));
        } catch (err) {
            next(err);
        }
    },

    async list(req, res, next) {
        try {
            const models = await carModelService.list({
                search: req.query.search,
                sortBy: req.query.sortBy,
            });

            return res.json(ok(models, "Car models list"));
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            const id = Number(req.params.id);
            await carModelService.remove(id);

            return res.json(ok(null, "Car model removed"));
        } catch (err) {
            next(err);
        }
    },

    async uploadImages(req, res, next) {
        try {
            const id = Number(req.params.id);
            const files = req.files || [];

            if (!files.length) {
                return res.status(400).json({
                    success: false,
                    message: "No files uploaded",
                });
            }

            const result = await carModelService.uploadImages(id, files);
            return res.json(ok(result, "Images uploaded"));
        } catch (err) {
            next(err);
        }
    },
};
