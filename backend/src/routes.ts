import { Router, Request, Response } from "express";

import AuthMiddleware from './middlewares/AuthMiddleware';

import { getThreads, saveThread } from './controller/ThreadsController';
import { saveUser, getUsers } from './controller/UserController';
import { authenticate } from './controller/AuthController';

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.send("Hello World")
});

routes.get("/threads", getThreads);
routes.post("/threads", saveThread);

routes.post("/user", saveUser);
routes.get("/user", AuthMiddleware, getUsers);

routes.post("/auth", authenticate);

export default routes;