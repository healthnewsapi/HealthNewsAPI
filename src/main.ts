import { noticias } from "./routes/noticias";
import { Server } from "./server/server";

const server = new Server();

server.startServer([noticias]);
