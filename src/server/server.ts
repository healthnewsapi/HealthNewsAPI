import * as restify from "restify";
import { IRouter } from "../routes/router";
import { environment } from "./environment";
import { handlerError } from "./error.handler";

export class Server {
  public appServer: restify.Server;

  constructor() {
    this.appServer = restify.createServer({
      name: "HealthNewsAPI",
      version: "1.0.0",
    });
  }

  public startServer(routes: IRouter[] = []) {
    this.initialiRoutes(routes);
  }

  private initialiRoutes(routes: IRouter[] = []) {

    this.appServer.use(restify.plugins.queryParser());
    this.appServer.use(restify.plugins.bodyParser());
    this.appServer.on("restifyError", handlerError);

    for (const route of routes) {
      route.applyRoutes(this.appServer);
    }

    this.listenServer();
  }

  private listenServer() {
    this.appServer.listen(environment.server.port, () => {
      console.log(`${this.appServer.name} listening at ${this.appServer.url}`);
    });
  }
}
