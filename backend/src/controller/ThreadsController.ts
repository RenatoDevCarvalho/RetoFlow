import { getRepository } from 'typeorm';
import { Threads } from '../entity/Threads';
import { Request, Response } from 'express';

export const getThreads = async (req: Request, res: Response) => {
  const threads = await getRepository(Threads).find();

  return res.json(threads);
};