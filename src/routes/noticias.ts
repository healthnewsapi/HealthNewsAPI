import { ApiResponse, RequestParams } from "@elastic/elasticsearch";
import * as restify from "restify";
import { Noticia } from "../model/noticiasModel";
import { client } from "../server/dbconnect";
import { Router } from "./Router";

interface IUpdateNews {
  doc: Noticia;
}

class Noticias implements Router {
  public applyRoutes(appServer: restify.Server) {

    // ROUTE: Get all the news
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

    // ROUTE: Add a news
    appServer.post("/noticias", async (req, resp, next) => {
      const doc: RequestParams.Index<Noticia> = {
        index: "noticias",
        body: req.body
      };

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

    // ROUTE: Change a news
    // If the ID exists the document is updated, if not, it creates a new document
    appServer.put("/noticias/:id", async (req, resp, next) => {
      const doc: RequestParams.Index<Noticia> = {
        id: req.params.id,
        index: "noticias",
        body: req.body
      };

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

    appServer.patch("/noticias/:id", async (req, resp, next) => {
      const docParams: RequestParams.Update<IUpdateNews> = {
        id: req.params.id,
        index: "noticias",
        body: {
          doc: req.body
        }
      };
      console.log(req.body);
      try {
        const result = await client.update(docParams);
        resp.json(result.body);
        console.log(result);
      } catch (err) {
          console.log(err);
          resp.json(err.meta.body.error);
      }
      return next();
    });

    // ROUTE: Delete a news
    appServer.del("/noticias", (req, resp, next) => {
      resp.json({message: "Noticia apagada"});
      return next();
    });
  }
}

export const noticias = new Noticias();
