import express, {} from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';
const app = express();
const port = config.port;
app.use(express.json());
app.get('/', (req, res) => {
    //   res.send('Express + typescript server');
    res.status(200).json({
        message: " express js server with typescript is working fine",
        "author": "Next js Developer",
    });
});
app.use("/api/users", userRoute);
export default app;
//# sourceMappingURL=app.js.map