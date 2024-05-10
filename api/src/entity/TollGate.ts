import {Entity, PrimaryGeneratedColumn, Column, OneToOne, Generated, OneToMany} from "typeorm"
import {Transaction} from "./Transaction";

@Entity("tollGate")
export class TollGate {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  uuid: string

  @Column({unique: true})
  address: string

  @Column()
  fee: number

  @OneToMany(() => Transaction, Transaction => Transaction.tollGate)
  transactions: Transaction[]
}
