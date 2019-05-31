import * as restify from "restify";

export interface Router {
  applyRoutes(appServer: restify.Server): void;
}
