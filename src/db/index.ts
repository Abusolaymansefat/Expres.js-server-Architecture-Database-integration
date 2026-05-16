import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
      connectionString: config.connection_string,
});

export const initDB = async () => {
      try {
            await pool.query(`
                  CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(50),
                  email VARCHAR(50) UNIQUE NOT NULL,
                  password VARCHAR(50) NOT NULL,
                  is_active BOOLEAN DEFAULT true,
                  age INT,
                  
                  created_at_timestamp TIMESTAMPTZ DEFAULT NOW(),
                  updated_at_timestamp TIMESTAMPTZ DEFAULT NOW()
                  )
                  `)
            console.log("database initialized successfully");
      } catch (error) {
            console.log(error)
      }
}