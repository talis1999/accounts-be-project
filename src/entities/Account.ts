import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  VersionColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: 0 })
  balance: number;

  @Column()
  dailyWithdrawlLimit: number;

  @Column({ default: true })
  activeFlag: boolean;

  @Column()
  accountType: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @VersionColumn()
  version: number;
}
