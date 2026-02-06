import type { IUserRepository } from "repositories/interfaces/users.interface";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import type { User } from "@prisma/client";
import {hash} from "bcrypt"


interface RegisterServiceRequest{
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceReponse{
    user:User
}

export class RegisterService{
    constructor(private usersRepository: IUserRepository){}
    async execute({name, email, password}: RegisterServiceRequest):Promise<RegisterServiceReponse>{
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password,8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: password_hash
        })

        return {
            user
        }
    }
}
