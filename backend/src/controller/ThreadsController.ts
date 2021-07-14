import { getRepository } from 'typeorm';
import { Threads } from '../entity/Threads';
import { Request, Response } from 'express';

export const getThreads = async (req: Request, res: Response) => {
  const threads = await getRepository(Threads).find();

  return res.json(threads);
};

export const saveThread = async (req: Request, res: Response) => {
  const thread = await getRepository(Threads).save(req.body);
  res.json(thread);
};