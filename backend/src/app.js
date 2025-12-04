import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { errorHandler } from "./core/ErrorHandler.js";
import { notFound } from "./middlewares/notFound.js";

import carModelRoutes from "./modules/carModel/carModel.routes.js";
import commissionRoutes from "./modules/commission/commission.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// static for uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/car-models", carModelRoutes);
app.use("/api/reports/commission", commissionRoutes);

// 404 + error
app.use(notFound);
app.use(errorHandler);

export default app;
