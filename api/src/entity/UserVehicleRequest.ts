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

    @Column()
    idCardFrontUrl: string

    @Column()
    idCardBackUrl: string

    @Column()
    driverLicenseFrontUrl: string

    @Column()
    driverLicenseBackUrl: string

    @Column()
    vehicleRCBookUrl: string

    @Column()
    vehiclePhotoUrl: string

    @Column({default: false})
    isApproved: boolean
}
