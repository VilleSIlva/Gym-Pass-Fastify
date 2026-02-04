import type { FastifyInstance } from "fastify";
import userController from "../controller/user.controller";

export async function userRouter(app: FastifyInstance) {
    app.post("/", userController.create);
}

