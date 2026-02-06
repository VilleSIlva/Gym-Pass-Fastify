import { UserInMemoryDatabaseRepository } from "repositories/InMemoryDatabase/users.repository"
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError"
import { RegisterService } from "./register.service"
import {describe, expect,test} from "vitest"
import { compare } from "bcrypt"

describe("Test register service",()=>{
    test("should be possible hash user password", async()=>{
        const registerService = new RegisterService(new UserInMemoryDatabaseRepository())
        const {user} = await registerService.execute({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "12345678"
        })
        const isPasswordCorrectlyHashed = await compare("12345678", user.password)
        
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    test("should not be possible register with same email", async()=>{
        const registerService = new RegisterService(new UserInMemoryDatabaseRepository())

        const email = "john.doe@example.com"

        await registerService.execute({
            name: "John Doe",
            email,
            password: "12345678"
        })

        expect(async()=>{
            await registerService.execute({
                name: "John Doe",
                email,
                password: "12345678"
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

    test("should be possible user register successfully",async()=>{
        const registerService = new RegisterService(new UserInMemoryDatabaseRepository())

        const {user} = await registerService.execute({
            name: "John Doe",
            email:"joedoe@gmail.com",
            password: "12345678"
        })

        expect(user.name).toEqual("John Doe") 
        expect(user.email).toEqual("joedoe@gmail.com")
    })
})