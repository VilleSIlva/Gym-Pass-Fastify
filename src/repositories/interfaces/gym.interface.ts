import {Prisma, type Gym} from "@prisma/client"

export interface IGymInterface{
    create(data:Prisma.GymUncheckedCreateInput):Promise<Gym>
    findById(gymId:string):Promise<Gym | null>
}