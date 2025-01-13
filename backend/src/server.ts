import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import notFound from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import userRouter from "./modules/user/user.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', userRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.use(notFound)
app.use(errorHandlerMiddleware)

const startServer = async () => {
    try {
        app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`)});
    } catch (error) {
        console.log('Error while starting the server: ', error);
        process.exit(1);
    }
};

startServer();



