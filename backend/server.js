import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";

app.listen(env.port, () => {
    console.log(`API server running on http://localhost:${env.port}`);
    logger.info(`Server started on port ${env.port}`);
});
