import {Prisma, type CheckIn} from "@prisma/client"

export interface ICheckInInterface{
    create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>
}