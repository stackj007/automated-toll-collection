import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm"
import {UserVehicleRequest} from "./UserVehicleRequest";

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

    @OneToOne(() => UserVehicleRequest, userVehicleRequest => userVehicleRequest.user)
    userVehicleRequest: UserVehicleRequest|null
}
