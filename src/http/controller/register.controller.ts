import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { RegisterService } from "services/register.service";
import { UsersRepository } from "repositories/prisma/users.repository";
import { UserAlreadyExistsError } from "services/errors/userAlreadyExistsError";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const zod = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });
    
    try{
        const { name, email, password } = zod.parse(request.body);

        const usersRepository = new UsersRepository()
        const registerService = new RegisterService(usersRepository)
        const response = await registerService.execute({name, email, password})
        
        return reply.status(201).send({ response })
    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({
                "message":error.message
            })
        }

        throw error
    }
}