import type { IGymInterface } from "repositories/interfaces/gym.interface"
import type {Prisma} from "@prisma/client"
import { prisma } from "lib/prisma"



export class GymRepository implements IGymInterface{
    async create(data:Prisma.GymUncheckedCreateInput){
      const gym = await prisma.gym.create({
        data
      })

      return gym
    }
}