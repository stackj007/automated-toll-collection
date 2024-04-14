import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm'
import { User } from './User'

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: true })
  stripeSessionId: string | null

  @ManyToOne(() => User, (user) => user.transactions, {
    nullable: true,
  })
  @JoinColumn()
  user: User | null

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
