import { Client } from "pg";

export const pgClient = new Client(process.env.POSTGRES_URL);

async function main() {
  await pgClient
    .connect()
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.log("Database connection error", err.stack);
      process.exit(1);
    });
}

export default main;
