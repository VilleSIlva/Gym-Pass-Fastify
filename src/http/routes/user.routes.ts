import {registerController} from "../controller/register.controller";
import type { FastifyInstance } from "fastify";

export async function userRouter(app: FastifyInstance) {
    app.post("/", registerController);
}

