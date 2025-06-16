// @ts-ignore
import express, { Request, Response } from 'express';
// @ts-ignore
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
