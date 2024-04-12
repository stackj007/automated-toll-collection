import {Entity, PrimaryGeneratedColumn, Column, OneToOne, Generated} from "typeorm"

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
}
