import { UserInMemoryDatabaseRepository } from "repositories/InMemoryDatabase/users.repository"
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError"
import { RegisterService } from "./register.service"
import {beforeEach, describe, expect,test} from "vitest"
import { compare } from "bcrypt"
import type { IUserRepository } from "repositories/interfaces/users.interface"

let userRepository: IUserRepository
let sut: RegisterService

describe("Test register service",()=>{

    beforeEach(()=>{
        userRepository = new UserInMemoryDatabaseRepository()
        sut = new RegisterService(userRepository)
    })

    test("should be possible hash user password", async()=>{
        const {user} = await sut.execute({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "12345678"
        })
        const isPasswordCorrectlyHashed = await compare("12345678", user.password)
        
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    test("should not be possible register with same email", async()=>{

        const email = "john.doe@example.com"

        await sut.execute({
            name: "John Doe",
            email,
            password: "12345678"
        })

        expect(async()=>{
            await sut.execute({
                name: "John Doe",
                email,
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    test("should be possible user register successfully",async()=>{

        const {user} = await sut.execute({
            name: "John Doe",
            email:"joedoe@gmail.com",
            password: "12345678"
        })

        expect(user.name).toEqual("John Doe") 
        expect(user.email).toEqual("joedoe@gmail.com")
    })
})