import { Router } from "express";
import { carModelController } from "./carModel.controller.js";
import { validate } from "../../middlewares/validate.js";
import { carModelCreateSchema, carModelQuerySchema, convertTypes } from "./carModel.validation.js";

const router = Router();

import { upload } from "../../middlewares/upload.js";

// CRUD
router.get("/", validate(carModelQuerySchema, "query"), carModelController.list);
router.post("/", upload.array("images"), convertTypes, validate(carModelCreateSchema), carModelController.create);
router.get("/:id", carModelController.get);
router.put("/:id", upload.array("images"), convertTypes, validate(carModelCreateSchema), carModelController.update);
router.delete("/:id", carModelController.remove);

// Images
router.post("/:id/images", upload.array("images", 10), carModelController.uploadImages);

export default router;
