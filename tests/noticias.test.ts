import "jest";
import * as restify from "restify";
import request from "supertest";
import { noticias } from "../src/routes/noticias";
import { environment } from "../src/server/environment";
import { Server } from "../src/server/server";

let serverTest: Server;
let andressTest: string;

beforeAll(() => {
  environment.server.port = process.env.SERVER_PORT_API || 3001;
  andressTest = `http://localhost:${environment.server.port}`;
  serverTest = new Server();
  serverTest.startServer([noticias]);
});

afterAll(() => {
  serverTest.appServer.close();
});

test("POST /noticias", () => {
  return request(andressTest)
          .post("/noticias")
          .send({
              author: "Nome do autor",
              content: "Esta é uma notícia sobre saúde...",
              description: "Descrição da notícia",
              event: [
                "dengue",
                "chuva",
              ],
              publishedAt: "2019-06-07T17:32:28Z",
              score: 6.2,
              source: "Nome do site da noticia",
              title: "Titulo da noticia",
              country: "BR",
              region: "Centro-oeste",
              uf: "DF",
              url: "sitedanoticia.com/noticia1",
              urlToImage: "sitedanoticia.com/noticia1/image.jpg",
            })
            .then((response: request.Response) => {
              expect(response.status).toBe(200);
              expect(response.body.data.id).toBeDefined();
              expect(response.body.data.author).toBe("Nome do autor");
              expect(response.body.data.content).toBe("Esta é uma notícia sobre saúde...");
              expect(response.body.data.description).toBe("Descrição da notícia");
              expect(response.body.data.event).toEqual(["dengue", "chuva"]);
              expect(response.body.data.publishedAt).toBe("2019-06-07T17:32:28Z");
              expect(response.body.data.score).toBe(6.2);
              expect(response.body.data.source).toBe("Nome do site da noticia");
              expect(response.body.data.title).toBe("Titulo da noticia");
              expect(response.body.data.country).toBe("BR");
              expect(response.body.data.region).toBe("Centro-oeste");
              expect(response.body.data.uf).toBe("DF");
              expect(response.body.data.url).toBe("sitedanoticia.com/noticia1");
              expect(response.body.data.urlToImage).toBe("sitedanoticia.com/noticia1/image.jpg");
            }).catch(fail);
});

test("PATCH /noticias/id", () => {
  return request(andressTest)
          .post("/noticias")
          .send({
              author: "Nome do autor",
              content: "Esta é uma notícia sobre saúde...",
              description: "Descrição da notícia",
              event: [
                "dengue",
                "chuva",
              ],
              publishedAt: "2019-06-07T17:32:28Z",
              score: 6.2,
              source: "Nome do site da noticia",
              title: "Titulo da noticia",
              country: "BR",
              region: "Centro-oeste",
              uf: "DF",
              url: "sitedanoticia.com/noticia1",
              urlToImage: "sitedanoticia.com/noticia1/image.jpg",
            })
            .then((response: request.Response) => request(andressTest)
                                                  .patch(`/noticias/${response.body.data.id}`)
                                                  .send({
                                                    uf: "GO",
                                                  }))
            .then((response: request.Response) => {
                expect(response.status).toBe(200);
                expect(response.body.data.id).toBeDefined();
                expect(response.body.data.doc.uf).toBe("GO");
              }).catch(fail);
});

test("GET /noticias", () => {
  return request(andressTest)
          .get("/noticias")
          .then((response: request.Response) => {
            if (response.body.data) {
              expect(response.status).toBe(200);
            } else {
              expect(response.status).toBe(400);
            }
            expect(response.body.data).toBeInstanceOf(Array);
          }).catch(fail);
});

test("GET /noticias/idNonExistent", () => {
  return request(andressTest)
          .get("/noticias/idNonExistent")
          .then((response: request.Response) => {
            expect(response.status).toBe(404);
          }).catch(fail);
});

