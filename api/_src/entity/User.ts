import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm"
import {UserVehicleRequest} from "./UserVehicleRequest";
import {Transaction} from "./Transaction";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({default: false})
    isAdmin: boolean

    @Column({default: '0'})
    balance: string

    @OneToOne(() => UserVehicleRequest, userVehicleRequest => userVehicleRequest.user)
    userVehicleRequest: UserVehicleRequest|null

    @OneToMany(() => Transaction, Transaction => Transaction.user)
    transactions: Transaction[]
}
