import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  VersionColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  balance: number;

  @Column()
  dailyWithdrawlLimit: number;

  @Column({ default: true })
  activeFlag: number;

  @Column()
  accountType: number;

  @CreateDateColumn()
  createdAt: Date;

  @VersionColumn()
  version: number;
}
