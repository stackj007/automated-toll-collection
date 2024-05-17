import {Entity, PrimaryGeneratedColumn, Column, OneToOne, Generated, OneToMany} from "typeorm"
import {Transaction} from "./Transaction";
import {PriceList} from "../types";
import {User} from "./User";

@Entity("tollGate")
export class TollGate {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  uuid: string

  @Column({unique: true})
  address: string

  @Column({type: 'json'})
  priceList: PriceList

  @OneToMany(() => Transaction, Transaction => Transaction.tollGate)
  transactions: Transaction[]

  fee(user: User): number {
    return this.priceList[user.userVehicleRequest.vehicleType]
  }
}
