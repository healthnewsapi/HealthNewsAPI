import * as restify from "restify";
import { Router } from "../routes/router";
import { environment } from "./environment";

export class Server {
  public appServer: restify.Server;

  constructor() {
    this.appServer = restify.createServer({
      name: "Database news",
      version: "1.0.0"
    });
  }

  public initRoutes(routes: Router[] = []) {

    this.appServer.use(restify.plugins.queryParser());

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
