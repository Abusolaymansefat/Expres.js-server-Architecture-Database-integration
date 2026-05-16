import express, { type Application, type Request, type Response } from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';
const app: Application = express();
const port = config.port;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
      //   res.send('Express + typescript server');
      res.status(200).json({
            message: " express js server with typescript is working fine",
            "author": "Next js Developer",
      });
});

app.use("/api/users", userRoute);


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
            UPDATE users
            SET name = COALESCE($1, name),
            password=COALESCE($2, password), 
            age=COALESCE($3, age),
            is_active= COALESCE($4, is_active) 
               
            WHERE id = $5 RETURNING *`,
                  [name, password, age, is_active, id]);

            if (result.rows.length === 0) {
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
});

// delete user by id 

app.delete("/api/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
            const result = await pool.query(`
                  DELETE FROM users WHERE id =$1 RETURNING *`,
                  [id]);

                  if(result.rows.length === 0){
                        res.status(404).json({
                              success: false,
                              message: "user not found",
                              data: {}
                        })
                  }


            res.status(200).json({
                  success: true,
                  message: "user deleted successfully",
                  data: {}
            });

      } catch (error: any) {
            res.status(500).json({
                  success: false,
                  message: error.message,
                  error: error
            })
      }
})



export default app;
