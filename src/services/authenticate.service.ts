import type { User } from "@prisma/client";
import type { IUserRepository } from "repositories/interfaces/users.interface";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";
import { compare } from "bcrypt";

interface AuthenticateServiceReq{
    email: string;
    password: string;
}

interface AuthenticateServiceRes{
    user: User;
}

export class AuthenticateService{
    constructor(private userRepository: IUserRepository){}

    async execute({email,password}:AuthenticateServiceReq):Promise<AuthenticateServiceRes>{
        const userExists = await this.userRepository.findByEmail(email)

        if(!userExists){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password,userExists.password)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return {
            user: userExists
        }
    }
}