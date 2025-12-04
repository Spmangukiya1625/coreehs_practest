// libs/knex.js
import knex from "knex";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

export const db = knex({
    client: "pg",
    connection: {
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
    },
    pool: { min: 2, max: 10 },
});

// Test connection on startup
(async () => {
    try {
        await db.raw("SELECT NOW()");
        console.log("🟢 PostgreSQL Connected");
        logger.info("PostgreSQL database connected successfully");
    } catch (err) {
        console.error("🔴 PostgreSQL Connection Failed:", err.message);
        logger.error("PostgreSQL connection error:", err);
        process.exit(1); // stop server if DB fails
    }
})();
