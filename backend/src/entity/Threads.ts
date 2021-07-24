import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: 0})
  answers: number;

  @ManyToOne(() => User, user => user.threads, { eager: true })
  user: User
}