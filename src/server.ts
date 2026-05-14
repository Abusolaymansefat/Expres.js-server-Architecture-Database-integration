import express, { type Application, type Request, type Response } from 'express';
import {Pool} from "pg"
const app: Application = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
      connectionString:
      "postgresql://neondb_owner:npg_k06shIcDLaoJ@ep-rapid-dew-aplchtdf-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
})

app.get('/', (req: Request, res: Response) => {
      //   res.send('Express + typescript server');
      res.status(200).json({
            message: " express js server with typescript is working fine",
            "author": "Next js Developer",
      });
});

app.post("/", async (req: Request, res: Response) => {
      // console.log(req.body);
      const { name, email, password } = req.body;
      res.status(201).json({
            message: "created successfully",
            data: { name, email },
      })

})

app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
