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


initDb();
app.get('/', (req: Request, res: Response) => {
      //   res.send('Express + typescript server');
      res.status(200).json({
            message: " express js server with typescript is working fine",
            "author": "Next js Developer",
      });
});


//  create user 
app.post("/api/users", async (req: Request, res: Response) => {
      // console.log(req.body);
      const { name, email, password, age } = req.body;

      try {
            const result = await pool.query(`
            INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *
            `, [name, email, password, age]);
            // console.log(result);

            res.status(201).json({
                  success: true,
                  message: "user created successfully",
                  data: result.rows[0],
            })
      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message || "something went wrong",
                  error: error
            })
      }

});

app.get("/api/users", async (req: Request, res: Response) => {
      try {
            const result = await pool.query(`
                  SELECT * FROM users`)
            res.status(200).json({
                  success: true,
                  message: "users retrieved successfully",
                  data: result.rows
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
            const result = await pool.query(`
                  SELECT * FROM users WHERE id = $1`,
                  [id]);

            if (result.rows.length === 0) {
                  res.status(404).json({
                        success: false,
                        message: "user not found",
                        data: null
                  });
            }
            res.status(200).json({
                  success: true,
                  message: "user retrieved successfully",
                  data: result.rows[0]
            });
      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
});


// exxplor the dtabase and update the user data using id

app.put("/api/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, password, age, is_active } = req.body;


      // console.log("id: ", id);
      // console.log({name, password, age, is_active});


      try {
            const result = await pool.query(`
            UPDATE users SET name = $1, password=$2, age=$3, is_active= $4 WHERE id = $5 RETURNING *`,
                  [name, password, age, is_active, id]);

                  if(result.rows.length === 0){
                        res.status(404).json({
                              success: false,
                              message: "User not found",
                              data: {}
                        })
                  }
            // console.log(result);

            res.status(200).json({
                  success: true,
                  message: "user updated successfully",
                  data: result.rows[0]
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
})


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
});
