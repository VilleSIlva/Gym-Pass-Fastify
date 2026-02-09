import type { ICheckInInterface } from "repositories/interfaces/checkIn.interface"
import type {Prisma} from "@prisma/client"
import { prisma } from "lib/prisma"



export class ChckInRepository implements ICheckInInterface{
    async create(data:Prisma.CheckInUncheckedCreateInput){
      const checkIn = await prisma.checkIn.create({
        data
      })

      return checkIn
    }
}