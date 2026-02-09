import type { CheckIn } from "@prisma/client";
import type { ICheckInInterface } from "repositories/interfaces/checkIn.interface";
import type { IGymInterface } from "repositories/interfaces/gym.interface";
import type { IUserRepository } from "repositories/interfaces/users.interface";
import { ResourcesNotFound } from "./errors/resourcesNotFoundError";



interface CheckInServiceReq{
    userId: string,
    gymId: string
}

interface CheckinServiceRes{
    checkIn:CheckIn
}

export class CheckInService{
    
    constructor(
        private userRepository: IUserRepository,
        private gymRepository: IGymInterface,
        private checkInRepository: ICheckInInterface
    ){}

    async execute({gymId,userId}:CheckInServiceReq):Promise<CheckinServiceRes>{

        const gym = await this.gymRepository.findById(gymId)
        const user = await this.userRepository.findById(userId)

        if(!gym || !user){
            throw new ResourcesNotFound()
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId,
        })

        return {
            checkIn
        }
    }
}