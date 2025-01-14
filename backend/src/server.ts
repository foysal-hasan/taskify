import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import notFound from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";
import userRouter from "./modules/user/user.route";
import todoRouter from "./modules/todo/todo.route";
import statusRouter from "./modules/status/status.route";
import priorityRouter from "./modules/priority/priority.route";
import tagRouter from "./modules/tag/tag.route";
import projectRouter from "./modules/project/project.route";
import workspaceRouter from "./modules/workspace/workspace.route";
import meetingRouter from "./modules/meeting/meeting.route";

import connectDB from "./config/db";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', userRouter)
app.use('/api/v1/todos', todoRouter)
app.use('/api/v1/statues', statusRouter)
app.use('/api/v1/priorities', priorityRouter)
app.use('/api/v1/tags', tagRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/workspaces', workspaceRouter)
app.use('/api/v1/meetings', meetingRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.use(notFound)
app.use(errorHandlerMiddleware)

const startServer = async () => {
    try {
        connectDB()
        app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`)});
    } catch (error) {
        console.log('Error while starting the server: ', error);
        process.exit(1);
    }
};

startServer();



