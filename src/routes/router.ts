import * as restify from "restify";

export interface IRouter {
  applyRoutes(appServer: restify.Server): void;
}
