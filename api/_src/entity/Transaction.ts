import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './User'
import {TollGate} from "./TollGate";

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: true })
  stripeSessionId: string | null

  @ManyToOne(() => User, (user) => user.transactions, {nullable: true, onDelete: 'CASCADE'})
  @JoinColumn()
  user: User | null

  @ManyToOne(() => TollGate, (tollgate) => tollgate.transactions, {nullable: true, onDelete: 'CASCADE'})
  @JoinColumn()
  tollGate: TollGate | null

  @Column()
  amount: string

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed'

  @Column({ default: 'fee' })
  type: 'fee' | 'deposit'

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date
}
