import { RequestParams } from "@elastic/elasticsearch";
import * as restify from "restify";
import { INoticia } from "../model/noticiasModel";
import { responsePagination } from "../routes/utils";
import { client } from "../server/dbconnect";
import { IRouter } from "./router";

interface IUpdateNews {
  doc: INoticia;
}

class Noticias implements IRouter {
  public applyRoutes(appServer: restify.Server) {

    // ROUTE: Get all the news
    appServer.get("/noticias", async (req, resp, next) => {
      let querySearch: any;
      const queries = req.query;
      delete queries.limit;
      delete queries.page;

      if (Object.entries(queries).length) {
        querySearch = {
          bool: {
            must: [],
          },
        };
        Object.keys(queries).map((key: any ) => {
          querySearch.bool.must.push(({match: {[key]: queries[key]}}));
        });
        console.log(querySearch.bool.must);
      } else {
        querySearch = {
          match_all: {},
        };
      }
      const limit = parseInt(req.query.limit, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      const skip = (page - 1 ) * limit;
      const searchParams: RequestParams.Search = {
        index: "noticias",
        size: limit,
        from: skip,
        body: {
          query: querySearch,
        },
      };
      let { body }: any = await client.search(searchParams)
                            .catch((err: Error) => { console.log(err); } );

      const totalItems = body.hits.total.value;
      body = body.hits.hits.map((obj: any) => {
        return Object.assign({id: obj._id}, obj._source);
      });

      resp.json(responsePagination(body, req.headers.host as string, req.url as string,
                                  limit, page, totalItems));
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
        resp.json(responsePagination([Object.assign({id: result.body._id},
                                                    result.body._source)],
                                                    req.headers.host as string,
                                                    req.url as string, 1, 1, 1, `/noticias/${result.body._id}`));
      } catch (err) {
          console.error(err);
          resp.json(err);
      }
      return next();
    });

    // ROUTE: Add a news
    appServer.post("/noticias", async (req, resp, next) => {
    // ROUTER: Add a news
      let dataResponse;
      const doc: RequestParams.Index<INoticia> = {
        index: "noticias",
        body: req.body,
      };

      try {
        const result = await client.index(doc);
        dataResponse = Object.assign({id: result.body._id}, JSON.parse(result.meta.request.params.body as any));
        resp.json(responsePagination(dataResponse,
                                    req.headers.host as string,
                                    req.url as string, 1, 1, 1, `/noticias/${dataResponse.id}`));
      } catch (err) {
          console.error(err);
          resp.send(err);
      }
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
