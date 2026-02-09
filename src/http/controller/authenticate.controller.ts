import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { makeAuthenticateService } from "services/factories/make-authenticate-service";
import { InvalidCredentialsError } from "services/errors/invalidCredentialsError";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const zod = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });
    
    try{
        const {email, password } = zod.parse(request.body);

        const {user} = await makeAuthenticateService().execute({email, password})

        const {password: _, ...userWithoutPassword} = user
        
        return reply.status(200).send({ 
            "message":"User authenticated sucessfully",
            user: userWithoutPassword
        })

    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return reply.status(409).send({
                "message":error.message
            })
        }

        throw error
    }
}