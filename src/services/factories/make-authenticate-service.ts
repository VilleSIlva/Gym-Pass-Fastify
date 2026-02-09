import { UsersRepository } from "repositories/prisma/users.repository"
import { AuthenticateService } from "services/authenticate.service"

export function makeAuthenticateService(){
    const userRepository = new UsersRepository()
    const authenticateService = new AuthenticateService(userRepository)
    return authenticateService
}