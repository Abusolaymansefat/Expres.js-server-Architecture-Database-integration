import express, { type Application, type Request, type Response } from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profiles/profile.route';
import { authRouter } from './modules/auth/auth.route';
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
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRouter);



export default app;
