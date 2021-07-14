import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response) => {
  const repo = getRepository(User);
  const { email, password } = req.body;

  const user = await repo.findOne({ where: { email } });

  if (!user) {
    return res.sendStatus(401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ id: user.id }, 'secret');

  return res.json({
    user,
    token
  });
}
