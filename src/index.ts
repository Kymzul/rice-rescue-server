import express, { Express } from "express";
import { PORT } from "./secret";
import { Request, Response } from "express"
import rootRoute from "./routes";


const app: Express = express();

app.use(express.json());

app.use('/api', rootRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        'message': 'Success',
        'data': 'Hello World'
    });
})

app.listen(PORT, () => {
    console.log('Server run on port: ' + PORT);
})