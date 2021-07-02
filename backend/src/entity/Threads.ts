import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: 0})
  answers: number;

}