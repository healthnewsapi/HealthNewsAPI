import { ApiResponse, RequestParams } from "@elastic/elasticsearch";
import * as restify from "restify";
import { Noticia } from "../model/noticiasModel";
import { client } from "../server/dbconnect";
import { Router } from "./Router";

class Noticias implements Router {
  public applyRoutes(appServer: restify.Server) {

    // ROUTER: Get all the news
    appServer.get("/noticias", async (req, resp, next) => {
      const searchParams: RequestParams.Search = {
        index: "noticias",
        body: {
          query: {
            match_all: {}
          }
        }
      };
      const { body }: any = await client.search(searchParams)
                            .catch((err: Error) => { console.log(err); } );
      resp.json(body.hits.hits);
      return next();
    });

    // ROUTER: Add a news
    appServer.post("/noticias", async (req, resp, next) => {
      const doc: RequestParams.Index<Noticia> = {
        index: "noticias",
        body: req.body
      };

      console.log(doc.body);

      try {
        const result = await client.index(doc);
        resp.json(result.body);
        console.log(result);
      } catch (err) {
          console.error(err);
          resp.send(err);
      }
      return next();

    });

    // ROUTER: Change a news
    appServer.put("/noticias", (req, resp, next) => {
      resp.json({message: "Noticia alterada"});
      return next();
    });

    // ROUTER: Delete a news
    appServer.del("/noticias", (req, resp, next) => {
      resp.json({message: "Noticia apagada"});
      return next();
    });
  }
}

export const noticias = new Noticias();
