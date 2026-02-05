import { env } from "env";
import { routes } from "./http/routes/index.routes";
import fastify from "fastify";
import {ZodError} from "zod"

const app = fastify();

app.register(routes);

app.setErrorHandler((err:any,req,res)=>{
    if(err instanceof ZodError){
        return res.status(404).send({
            "message":"bad request",
            "issues":err.format()
        })
    }

    if(env.NODE_ENV == "development"){
        console.error(err)
    }

    return res.status(400).send("Internal server error")
})

export default app;