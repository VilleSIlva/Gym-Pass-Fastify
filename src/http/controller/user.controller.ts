import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const zod = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
        });

        try {
            const { name, email, password } = zod.parse(request.body);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });

            return reply.status(201).send({ user });
        } catch (error) {
            return reply.status(400).send({ message: "Invalid request body" });
        }
    }
}

export default new UserController();