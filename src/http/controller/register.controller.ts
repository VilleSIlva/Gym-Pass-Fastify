import { UserAlreadyExistsError } from "services/errors/userAlreadyExistsError";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeRegisterService } from "services/factories/make-register-service";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const zod = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });
    
    try{
        const { name, email, password } = zod.parse(request.body);

        const {user} = await makeRegisterService().execute({name, email, password})
        
        return reply.status(201).send({ 
            "message":"User created sucessfully",
            user
        })

    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({
                "message":error.message
            })
        }

        throw error
    }
}