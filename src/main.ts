import { Server } from "./config/server";
import { noticias } from "./routes/noticias";

const server = new Server();

server.initRoutes([noticias]);
