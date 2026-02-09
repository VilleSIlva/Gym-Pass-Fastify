import { UsersRepository } from "repositories/prisma/users.repository";
import { GetProfileService } from "services/getProfile.service";

export function MakeGetProfileService(){
    const userRepository = new UsersRepository()
    const getProfileService = new GetProfileService(userRepository)
    return getProfileService
}