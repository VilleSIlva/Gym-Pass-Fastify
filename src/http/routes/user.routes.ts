import type { FastifyInstance } from "fastify";
import {registerController} from "../controller/register.controller";

export async function userRouter(app: FastifyInstance) {
    app.post("/", registerController);
}

