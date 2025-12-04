import { AppError } from "./AppError.js";
import { logger } from "../config/logger.js";

export function errorHandler(err, req, res, next) {
    const appError = err instanceof AppError ? err : new AppError("Internal server error");
    logger.error({
        message: appError.message,
        stack: err.stack,
        method: req.method,
        path: req.path,
    });

    res.status(appError.statusCode).json({
        success: false,
        message: appError.message,
    });
}
