import { Router, Request, Response } from "express";

import { getThreads } from './controller/THreadsController';

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.send("Hello World")
});

routes.get("/threads", getThreads);

export default routes;