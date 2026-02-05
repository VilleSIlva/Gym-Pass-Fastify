import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";
import type { IUserRepository } from "repositories/interfaces/users.interfaces";

export class UsersRepository implements IUserRepository{
    async create(data:Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })

        return user;
    }

    async findByEmail(email:string){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user;
    }
}