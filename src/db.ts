import { createPool, Pool } from "mysql2/promise";

export async function connect(): Promise<Pool> {
  const conn = await createPool({
    host: "localhost",
    user: "root",
    database: "db_chaplin",
    connectionLimit: 10,
  });

  return conn;
}
