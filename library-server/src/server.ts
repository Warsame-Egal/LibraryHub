import express, {Express, Request, Response} from 'express';
import cors from 'cors';

const Port = 8000;

const app:Express = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req:Request, res:Response) => {
    res.status(200).json({message: "Server is running"});
})

app.listen(Port, () => {
    console.log('Server listening on port ${PORT}');
})
