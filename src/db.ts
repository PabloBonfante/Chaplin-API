import { createPool, Pool } from "mysql2/promise";
export async function connect(): Promise<Pool> {
  const conn = await createPool({
    host: "localhost",
    user: "root",
    password: "*AurelionSol_4014",
    database: "chaplindb",
    connectionLimit: 10,
  });

  return conn;
}


