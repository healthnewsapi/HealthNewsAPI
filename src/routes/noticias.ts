import { ApiResponse, RequestParams } from "@elastic/elasticsearch";
import * as restify from "restify";
import { INoticia } from "../model/noticiasModel";
import { client } from "../server/dbconnect";
import { IRouter } from "./router";

interface IUpdateNews {
  doc: INoticia;
}

class Noticias implements IRouter {
  public applyRoutes(appServer: restify.Server) {

    // ROUTE: Get all the news
    appServer.get("/noticias", async (req, resp, next) => {
      const searchParams: RequestParams.Search = {
        index: "noticias",
        body: {
          query: {
            match_all: {},
          },
        },
      };
      const { body }: any = await client.search(searchParams)
                            .catch((err: Error) => { console.log(err); } );
      resp.json(body.hits.hits);
      return next();
    });

    // ROUTE: Search for ID
    appServer.get("/noticias/:id", async (req, resp, next) => {
      const doc: RequestParams.Get = {
        id: req.params.id,
        index: "noticias",
      };

      try {
        const result = await client.get(doc);
        resp.json(result.body);
        console.log(result);
      } catch (err) {
          console.error(err);
          resp.json(err);
      }
      return next();
    });

    // ROUTE: Add a news
    appServer.post("/noticias", async (req, resp, next) => {
      const docs = new Array();

      if (!(req.body instanceof Array)) {
        req.body = new Array(req.body);
      }

      for (const noticiaItem of req.body) {
        docs.push({ index: {} });
        docs.push(noticiaItem);
      }

      try {
        const { body: bulkResponse } = await client.bulk({
          index: "noticias",
          body: docs,
        });
        if (bulkResponse.errors) {
          console.log(bulkResponse);
          resp.json(bulkResponse);
        }
      } catch (err) {
        console.error(err);
        resp.json(err);
    }
      resp.json(docs);
      return next();
    });

    // ROUTE: Change a news
    // If the ID exists the document is updated, if not, it creates a new document
    appServer.put("/noticias/:id", async (req, resp, next) => {
      const doc: RequestParams.Index<INoticia> = {
        id: req.params.id,
        index: "noticias",
        body: req.body,
      };

      try {
        const result = await client.index(doc);
        resp.json(result.body);
        console.log(result);
      } catch (err) {
          console.error(err);
          resp.json(err);
      }
      return next();
    });

    appServer.patch("/noticias/:id", async (req, resp, next) => {
      const docParams: RequestParams.Update<IUpdateNews> = {
        id: req.params.id,
        index: "noticias",
        body: {
          doc: req.body,
        },
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
    appServer.del("/noticias/:id", async (req, resp, next) => {
      const docReference: RequestParams.Delete = {
        id: req.params.id,
        index: "noticias",
      };

      try {
        const result = await client.delete(docReference);
        resp.json(result);
        console.log(result);
      } catch (err) {
          console.error(err);
          resp.json(err);
      }
      return next();
    });
  }
}

export const noticias = new Noticias();
