import { Router } from "express";
import { commissionController } from "./commission.controller.js";

const router = Router();

router.get("/", commissionController.list);
router.get("/export", commissionController.exportCsv);

export default router;
