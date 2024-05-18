import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {User} from "./User";
import {UserVehicleRequestStatus, VehicleType} from "../types";

@Entity("userVehicleRequest")
export class UserVehicleRequest {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.userVehicleRequest, {onDelete: 'CASCADE'})
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

    @Column({default: UserVehicleRequestStatus.pending})
    status: UserVehicleRequestStatus

    @Column({default: VehicleType.car})
    vehicleType: VehicleType

    @Column()
    vehicleName: string

    setStatus(status: UserVehicleRequestStatus) {
        this.status = status
    }
}
