import * as jestCli from "jest-cli";
import { Noticias } from "./src/routes/noticias";
import { Database } from "./src/server/dbconnect";
import { auth, environment, environmentTest } from "./src/server/environment";
import { Server } from "./src/server/server";

let serverTest: Server;

const beforeAllTests = async () => {
  environment.server.port = environmentTest.serverTest.port;
  environment.db.url = environmentTest.dbTest.url;
  auth.apiKey = environmentTest.authTest.apiKey;

  // Start Database Test
  const client = new Database().client;
  // Start Routes
  const noticias =  new Noticias(client);
  // Start Server Test
  serverTest = new Server();
  serverTest.startServer([noticias]);

  await new Promise((done) => setTimeout(done, 2000));
  await jestCli.run();
};

const afterAllTests = () => {
  serverTest.appServer.close();
};

beforeAllTests()
  .then(() => { afterAllTests(); });
