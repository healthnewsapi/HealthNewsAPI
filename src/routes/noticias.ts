import { Router } from "./Router";
import * as restify from "restify";

class Noticias implements Router {
  public applyRoutes(appServer: restify.Server) {

    // Get all the news
    appServer.get("/noticias", (req, resp, next) => {
      resp.json({message: "Todas as noticias"});
      return next();
    });

    // Add a news
    appServer.post("/noticias", (req, resp, next) => {
      resp.json({message: "Uma nova noticias adicionada"});
      return next();
    });

    // Change a news
    appServer.put("/noticias", (req, resp, next) => {
      resp.json({message: "Noticia alterada"});
      return next();
    });

    // Delete a news
    appServer.del("/noticias", (req, resp, next) => {
      resp.json({message: "Noticia apagada"});
      return next();
    });
  }
}

export const noticias = new Noticias();
