import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {User} from "./User";

@Entity("userVehicleRequest")
export class UserVehicleRequest {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.userVehicleRequest)
    @JoinColumn()
    user: User

    @Column({unique: true})
    vehicleNumber: string

    @Column({nullable: true})
    idCardUrl: string

    @Column({nullable: true})
    driverLicenseUrl: string

    @Column({nullable: true})
    vehicleRCBookUrl: string

    @Column({default: "pending"})
    status: "pending" | "approved" | "rejected"

    setStatus(status: "pending" | "approved" | "rejected") {
        this.status = status
    }
}
