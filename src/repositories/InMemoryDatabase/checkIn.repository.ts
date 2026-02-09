import type { ICheckInInterface } from "repositories/interfaces/checkIn.interface"
import type {CheckIn, Prisma} from "@prisma/client"
import { randomUUID } from "crypto"


export class ChckInMemoryDatabaseRepository implements ICheckInInterface{
    checkIn:CheckIn[] = []

    async create(data:Prisma.CheckInUncheckedCreateInput){
        const checkIn:CheckIn = {
            id: data.id || randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at || null,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            updatedAt: new Date()
        }

        this.checkIn.push(checkIn)

        return checkIn
    }

}