import {beforeEach, describe, expect,test} from "vitest"
import { UserInMemoryDatabaseRepository } from "repositories/InMemoryDatabase/users.repository"
import { AuthenticateService } from "./authenticate.service"
import type { IUserRepository } from "repositories/interfaces/users.interface"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError"
import { hash } from "bcrypt"

let userRepository: IUserRepository
let sut: AuthenticateService

describe("Test authenticate service",()=>{
    beforeEach(()=>{
        userRepository = new UserInMemoryDatabaseRepository()
        sut = new AuthenticateService(userRepository)
    })

    test("should not be possible authenticate with invalid email", async()=>{
        expect(async()=>{
            await sut.execute({
                email: "invalid@email.com",
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test("should not be possible authenticate with invalid password", async()=>{
        await userRepository.create({
            name: "John Doe",
            email: "john.doe@example.com",
            password: await hash("12345678",6)
        })
        
        expect(async()=>{
            await sut.execute({
                email: "john.doe@example.com",
                password: "invalid_password"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})