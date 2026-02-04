import { routes } from "./http/routes/index.routes";
import fastify from "fastify";

const app = fastify();

app.register(routes);

export default app;