export enum VehicleType {
    car = 'car',
    motorcycle = 'motorcycle',
    bus = 'bus',
    truck = 'truck',
    trailer = 'trailer'
}

export type PriceList = {
    [key in VehicleType]: number
}

export enum UserVehicleRequestStatus {
    pending = 'pending',
    approved = 'approved',
    rejected = 'rejected'
}

