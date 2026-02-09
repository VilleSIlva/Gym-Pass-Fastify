import type { IUserRepository } from "repositories/interfaces/users.interface"  
import type { User } from "@prisma/client"
import { ResourcesNotFound } from "./errors/resourcesNotFoundError"

interface GetProfileServiceRequest{
    userId: string
}

interface GetProfileServiceResponse{
    user: User
}

export class GetProfileService{
    constructor(private userRepository: IUserRepository){}

    async execute({userId}: GetProfileServiceRequest): Promise<GetProfileServiceResponse>{
        const user = await this.userRepository.findById(userId)

        if(!user){
            throw new ResourcesNotFound()
        }

        return {user}
    }
}