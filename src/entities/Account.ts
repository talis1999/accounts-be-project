import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  VersionColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;

  @VersionColumn()
  version: number;
}
