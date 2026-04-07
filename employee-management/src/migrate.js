const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

const migrationsDir = path.join(__dirname, "migrations");

const ensureMigrationsTable = async () => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (id SERIAL PRIMARY KEY, filename TEXT UNIQUE NOT NULL, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())"
  );
};

const getMigrationFiles = () => {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }
  return fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();
};

const hasMigrationRun = async (filename) => {
  const result = await pool.query(
    "SELECT 1 FROM schema_migrations WHERE filename = $1",
    [filename]
  );
  return result.rowCount > 0;
};

const applyMigration = async (filename) => {
  const filePath = path.join(migrationsDir, filename);
  const sql = fs.readFileSync(filePath, "utf8");

  await pool.query("BEGIN");
  try {
    await pool.query(sql);
    await pool.query(
      "INSERT INTO schema_migrations (filename) VALUES ($1)",
      [filename]
    );
    await pool.query("COMMIT");
    console.log(`Applied migration: ${filename}`);
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

const runMigrations = async () => {
  await ensureMigrationsTable();
  const files = getMigrationFiles();

  if (files.length === 0) {
    console.log("No migrations found.");
    return;
  }

  for (const filename of files) {
    const alreadyApplied = await hasMigrationRun(filename);
    if (!alreadyApplied) {
      await applyMigration(filename);
    }
  }

  console.log("Migrations complete.");
};

runMigrations()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
