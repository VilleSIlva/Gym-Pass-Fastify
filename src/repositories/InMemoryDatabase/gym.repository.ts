import type {Gym, Prisma} from "@prisma/client"
import type { IGymInterface } from "repositories/interfaces/gym.interface"
import { randomUUID } from "crypto"
import { Decimal } from "@prisma/client/runtime/client"




export class GymInMemoryDatabaseRepository implements IGymInterface{
    gyms:Gym[] = []

    async create(data:Prisma.GymUncheckedCreateInput){
        const gym:Gym = {
            id: data.id || randomUUID(),
            description: data.description,
            name: data.name,
            latitude: Decimal(Number(data.latitude)),
            longitude: Decimal(Number(data.longitude)),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.gyms.push(gym)

        return gym
    }

    async findById(gymId:string):Promise<Gym | null>{
        const gym = this.gyms.find((gym)=>{
            return gym.id == gymId
        })

        if(!gym){
            return null
        }

        return gym
    }


}