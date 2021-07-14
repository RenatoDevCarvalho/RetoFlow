import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Request, Response } from 'express';

export const saveUser = async (req: Request, res: Response) => {
  const repo = getRepository(User);
  const { email } = req.body;

  const userExists = await repo.findOne({ where: { email } });

  if (userExists) {
    return res.status(409).send("Email já cadastrado");
  }

  const user = repo.create(req.body);
  await repo.save(user);

  return res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await getRepository(User).find();
  return res.json(users);
};