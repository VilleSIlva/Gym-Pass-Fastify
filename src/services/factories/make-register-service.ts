import { UsersRepository } from "repositories/prisma/users.repository"
import { RegisterService } from "services/register.service"

export function makeRegisterService(){
    const userRepository = new UsersRepository()
    const registerService = new RegisterService(userRepository)
    return registerService
}