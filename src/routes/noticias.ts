import { Client, RequestParams } from "@elastic/elasticsearch";
import * as restify from "restify";
import { INoticia } from "../model/noticiasModel";
import { responsePagination } from "../routes/utils";
import { authorization } from "../server/authorization";
import { CustomError } from "../server/error.handler";
import { IRouter } from "./router";
import { patchDocValidation, postDocValidation } from "./validation";

interface IUpdateNews {
  doc: INoticia;
}

export class Noticias implements IRouter {
  public client: Client;

  constructor(clientDB: Client) {
    this.client = clientDB;
  }

  public applyRoutes(appServer: restify.Server) {
    // ROUTE: Get all the news
    appServer.get("/noticias", async (req, resp, next) => {
      let URLquery = "";
      let querySearch: any;

      const queries = Object.assign({}, req.query);
      delete queries.items;
      delete queries.page;

      if (Object.entries(queries).length) {
        URLquery = Object.entries(queries).map((value) => value.join("=")).join("&").concat("&");
        querySearch = {
          bool: {
            must: [],
          },
        };
        Object.keys(queries).map((key: any ) => {
          querySearch.bool.must.push(({match: {[key]: queries[key]}}));
        });
      } else {
        querySearch = {
          match_all: {},
        };
      }
      const items = parseInt(req.query.items, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      const skip = (page - 1 ) * items;
      const searchParams: RequestParams.Search = {
        index: "noticias",
        size: items,
        from: skip,
        body: {
          query: querySearch,
        },
      };

      try {
        let { body }: any = await this.client.search(searchParams);

        const totalItems = body.hits.total.value;
        body = body.hits.hits.map((obj: any) => {
          return Object.assign({id: obj._id}, obj._source);
        });

        resp.json(responsePagination(body, req.headers.host as string, req.url as string,
                                    items, page, totalItems, undefined, URLquery));
      } catch (err) {
        next(err);
      }

      return next();
    });

    // ROUTE: Search for ID
    appServer.get("/noticias/:id", async (req, resp, next) => {
      const doc: RequestParams.Get = {
        id: req.params.id,
        index: "noticias",
      };

      try {
        const result = await this.client.get(doc);
        resp.json(responsePagination(Object.assign({id: result.body._id},
                                                    result.body._source),
                                                    req.headers.host as string,
                                                    req.url as string, 1, 1, 1, `/noticias/${result.body._id}`));
      } catch (err) {
        next(err);
      }

      return next();
    });

    // ROUTE: Add a news
    appServer.post("/noticias", async (req, resp, next) => {
      try {
        if (!authorization(req.headers)) {
          throw new CustomError(" Invalid Credentials", "Unauthorized", 401);
        }
        if (!postDocValidation(req.body)) {
          throw new CustomError("Document with Invalid Field(s)", "InvalidField", 400);
        }

        Object.assign(req.body, {indicators: {postedClipping: null, markedClipping: null,
                                              mapViews: 0, mapDetails: 0}});

        const doc: RequestParams.Index<INoticia> = {
          index: "noticias",
          body: req.body,
        };
        const result = await this.client.index(doc);
        const dataResponse = Object.assign({id: result.body._id},
                                            JSON.parse(result.meta.request.params.body as any));
        resp.json(responsePagination(dataResponse,
                                    req.headers.host as string,
                                    req.url as string, 1, 1, 1, `/noticias/${dataResponse.id}`));
      } catch (err) {
        next(err);
      }
      return next();
    });

    // ROUTE: Change a news
    // If the ID exists the document is updated, if not, it creates a new document
    appServer.put("/noticias/:id", async (req, resp, next) => {
      const validator: RequestParams.Exists = {
        id: req.params.id,
        index: "noticias",
      };

      try {
        if (!authorization(req.headers)) {
          throw new CustomError(" Invalid Credentials", "Unauthorized", 401);
        }
        const validatorResult = await this.client.exists(validator);
        if (validatorResult.statusCode === 404) {
          throw new CustomError("ID not found", "idNotFound", 404);
        }

        if (!postDocValidation(req.body)) {
          throw new CustomError("Document with Invalid Field(s)", "InvalidField", 400);
        }

        Object.assign(req.body, {indicators: {postedClipping: null, markedClipping: null,
                                              mapViews: 0, mapDetails: 0}});

        const doc: RequestParams.Index<INoticia> = {
          id: req.params.id,
          index: "noticias",
          body: req.body,
        };
        const result = await this.client.index(doc);
        const dataResponse = Object.assign({id: result.body._id},
                                            JSON.parse(result.meta.request.params.body as any));

        resp.json(responsePagination(dataResponse,
                                    req.headers.host as string,
                                    req.url as string, 1, 1, 1, `/noticias/${dataResponse.id}`));
      } catch (err) {
        next(err);
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
      try {
        if (!authorization(req.headers)) {
          throw new CustomError(" Invalid Credentials", "Unauthorized", 401);
        }
        if (!patchDocValidation(req.body)) {
          throw new CustomError("Document with Invalid Field(s)", "InvalidField", 400);
        }
        const result = await this.client.update(docParams);
        const dataResponse = Object.assign({id: result.body._id}, JSON.parse(result.meta.request.params.body as any));
        resp.json(responsePagination(dataResponse,
                                    req.headers.host as string,
                                    req.url as string, 1, 1, 1, `/noticias/${dataResponse.id}`));
      } catch (err) {
        next(err);
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
        if (!authorization(req.headers)) {
          throw new CustomError(" Invalid Credentials", "Unauthorized", 401);
        }
        const result = await this.client.delete(docReference);
        resp.json({result: result.body.result});
      } catch (err) {
        next(err);
      }
      return next();
    });
  }
}
