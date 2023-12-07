import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  development: {
    client: "pg",
    connection: {
      host: process.env.postgres_HOST,
      user: process.env.postgres_USER,
      password: process.env.postgres_PASSWORD,
      database: process.env.postgres_DATABASE,
      port: process.env.postgres_PORT,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  // ... other environments
};

export default dbConfig;
