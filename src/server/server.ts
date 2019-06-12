import * as restify from "restify";
import corsMiddleware from "restify-cors-middleware";
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
    const corsOptions: corsMiddleware.Options = {
      origins: ["*"],
      preflightMaxAge: 10,
      allowHeaders: [],
      exposeHeaders: [],
    };

    const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

    this.appServer.pre(cors.preflight);
    this.appServer.use(cors.actual);
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
