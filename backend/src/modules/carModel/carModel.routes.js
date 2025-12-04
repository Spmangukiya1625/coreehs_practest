import { Router } from "express";
import multer from "multer";
import path from "path";
import { carModelController } from "./carModel.controller.js";
import { validate } from "../../middlewares/validate.js";
import { carModelCreateSchema, carModelQuerySchema } from "./carModel.validation.js";

const router = Router();

const upload = multer({
    dest: path.join(process.cwd(), "uploads"),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
});

// CRUD
router.get("/", validate(carModelQuerySchema, "query"), carModelController.list);
router.post("/", validate(carModelCreateSchema), carModelController.create);
router.get("/:id", carModelController.get);
router.put("/:id", validate(carModelCreateSchema), carModelController.update);
router.delete("/:id", carModelController.remove);

// Images
router.post("/:id/images", upload.array("images", 10), carModelController.uploadImages);

export default router;
