import * as restify from "restify";
import { environment } from "./environment";

export class Server {
  public app: restify.Server;

  constructor() {
    this.app = restify.createServer({
      name: "Database news",
      version: "1.0.0"
    });
  }

  public initRoutes() {

    this.app.use(restify.plugins.queryParser());

    // Routes

    this.app.get("/hello/:name", (req, resp, next) => {
      resp.json({
        nome: req.params.name,
        query: req.query
      });
      return next();
    });

    this.listenServer();
  }

  private listenServer() {
    this.app.listen(environment.server.port, () => {
      console.log(`${this.app.name} listening at ${this.app.url}`);
    });
  }
}
