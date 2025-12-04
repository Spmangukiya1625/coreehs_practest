require("dotenv").config();
const knexConfig = require("./knexfile.cjs");
const knex = require("knex")(knexConfig);

async function runSeeds() {
    try {
        console.log("🌱 Running seeds...");
        await knex.seed.run();
        console.log("✅ Seeds completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed Error:", err);
        process.exit(1);
    }
}

async function runMigrations() {
    try {
        console.log("📦 Running migrations...");
        await knex.migrate.latest();
        console.log("✅ Migrations completed!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Migration Error:", err);
        process.exit(1);
    }
}

// Choose action by env variable
const action = process.argv[2];

if (action === "migrate") {
    runMigrations();
} else if (action === "seed") {
    runSeeds();
} else {
    console.log("Usage:");
    console.log("  node knex-runner.cjs migrate");
    console.log("  node knex-runner.cjs seed");
    process.exit(0);
}
