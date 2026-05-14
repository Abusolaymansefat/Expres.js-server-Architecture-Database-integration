import express, { type Application, type Request, type Response } from 'express';
import { Pool } from "pg"
const app: Application = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
      connectionString:
            "postgresql://neondb_owner:npg_k06shIcDLaoJ@ep-rapid-dew-aplchtdf-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDb = async () => {
      try {
            await pool.query(`
                  CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(20),
                  email VARCHAR(20) UNIQUE NOT NULL,
                  password VARCHAR(20) NOT NULL,
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


initDb();
app.get('/', (req: Request, res: Response) => {
      //   res.send('Express + typescript server');
      res.status(200).json({
            message: " express js server with typescript is working fine",
            "author": "Next js Developer",
      });
});

app.post("/", async (req: Request, res: Response) => {
      // console.log(req.body);
      const { name, email, password, age } = req.body;

      try {
            const result = await pool.query(`
            INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
            `, [name, email, password, age]);
            // console.log(result);

      res.status(201).json({

            message: "user created successfully",
            data: result.rows[0],
      })
      }catch (error: any) {
            res.status(500).json({
                  message: error.message || "something went wrong",
                  error: error
            })
      }

})


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
