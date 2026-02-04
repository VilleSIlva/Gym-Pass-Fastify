import { userRouter } from "./user.routes";

import type { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance){
    app.register(userRouter, { prefix: "/users" });
}

export default routes;