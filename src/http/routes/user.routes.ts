import { authenticateController } from "http/controller/authenticate.controller";
import {registerController} from "../controller/register.controller";
import type { FastifyInstance } from "fastify";
import { getProfile } from "http/controller/getProfile.controller";

export async function userRouter(app: FastifyInstance) {
    app.post("/", registerController);
    app.post("/session", authenticateController);
    app.get("/profile/:id",getProfile)
}

