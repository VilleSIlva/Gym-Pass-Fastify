import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourcesNotFound } from "services/errors/resourcesNotFoundError";
import { MakeGetProfileService } from "services/factories/make-get-profile-service";
import z from "zod";

export async function getProfile(req:FastifyRequest, res:FastifyReply){
    const schemaParams = z.object({
        "id": z.string().uuid()
    })

    try {
        const {id} = schemaParams.parse(req.params)
        const {user} = await MakeGetProfileService().execute({userId:id})

        const {password:_,...userWithoutPassword} = user

        return{
            userWithoutPassword
        }
    } catch (error) {
        if(error instanceof ResourcesNotFound){
            return res.status(404).send({
                "message":error.message
            })
        }

        throw error
    }
}