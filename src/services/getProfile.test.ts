import type {IUserRepository} from "../repositories/interfaces/users.interface"
import { describe,test,beforeEach, expect } from "vitest";
import { GetProfileService } from "./getProfile.service";
import { UserInMemoryDatabaseRepository } from "repositories/InMemoryDatabase/users.repository";
import { ResourcesNotFound } from "./errors/resourcesNotFoundError";
import { hash } from "bcrypt";

let userRepository : IUserRepository
let sut : GetProfileService
describe("Test service getProfile",()=>{

    beforeEach(()=>{
        userRepository = new UserInMemoryDatabaseRepository()
        sut = new GetProfileService(userRepository)
    })

    test("It should not return a profile with an incorrect ID.",async()=>{
       await expect(async()=>{
            await sut.execute({
                userId:"123234"
            })
       }).rejects.toBeInstanceOf(ResourcesNotFound)
    })

    test("should be return profile",async()=>{
        const newUser = await userRepository.create({
            name:"Joe doe",
            email:"joedoe@email.com",
            password: await hash("12345678",6)
        })

        const {user} = await sut.execute({
            userId:newUser.id
        })

        expect(user.name).toEqual(expect.any(String))
        expect(user.email).toEqual(expect.any(String))
    })
})