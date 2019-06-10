import { Noticias } from "./routes/noticias";
import { Database } from "./server/dbconnect";
import { Server } from "./server/server";

// Start Database
const client = new Database().client;

// Start Routes
const noticias =  new Noticias(client);

// Start Server
const server = new Server();
server.startServer([noticias]);
