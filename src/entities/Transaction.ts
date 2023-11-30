import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
