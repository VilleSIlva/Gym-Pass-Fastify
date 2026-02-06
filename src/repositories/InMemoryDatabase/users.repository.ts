import type { IUserRepository } from "repositories/interfaces/users.interface"
import type {Prisma, User} from "@prisma/client"
import { randomUUID } from "crypto"

export class UserInMemoryDatabaseRepository implements IUserRepository{
    users:User[] = []

    async create(data:Prisma.UserCreateInput){
        const user:User = {
            id: data.id || randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.users.push(user)

        return user
    }

    async findByEmail(email: string){
        const user = this.users.find((user)=>{
            return user.email === email
        })

        if(!user){
            return null
        }

        return user
    }

}