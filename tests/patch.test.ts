import "jest";
import request from "supertest";
import { environmentTest } from "../src/server/environment";

const andressTest = `http://localhost:${environmentTest.serverTest.port}`;
const [user, pass] = environmentTest.authTest.apiKey.split(":");

const dataPost = {
  author: "Nome do autor",
  content: "Esta é uma notícia sobre saúde...",
  description: "Descrição da notícia",
  event: [
    "dengue",
    "chuva",
  ],
  publishedAt: "2019-06-07T17:32:28Z",
  insertionDate: "2018-11-19",
  score: 6.2,
  source: "Nome do site da noticia",
  title: "Titulo da noticia",
  country: "BR",
  region: "Centro-oeste",
  uf: "DF",
  url: "sitedanoticia.com/noticia1",
  urlToImage: "sitedanoticia.com/noticia1/image.jpg",
};

test("PATCH /noticias/id - Sucess case", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .patch(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send({
                                                    uf: "GO",
                                                  }))
            .then((response: request.Response) => {
                expect(response.status).toBe(200);
                expect(response.body.data.id).toBeDefined();
                expect(response.body.data.doc.uf).toBe("GO");
            }).catch(fail);
});

test("PATCH /noticias/id - Invalid ID", () => {
  return request(andressTest)
          .patch("/noticias/InvalidID5432")
          .auth(user, pass)
            .send({
              invalidField: "XYZ",
            })
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});

test("PATCH /noticias/id - Invalid Field", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .patch(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send({
                                                    invalidField: "XYZ",
                                                  }))
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});

test("PATCH /noticias/id - indicators Field - Sucess case", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .patch(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send({
                                                    indicators: {
                                                      mapViews: 1,
                                                    },
                                                  }))
            .then((response: request.Response) => {
                expect(response.status).toBe(200);
                expect(response.body.data.id).toBeDefined();
                expect(response.body.data.doc.indicators.mapViews).toBe(1);
            }).catch(fail);
});

test("PATCH /noticias/id - indicators Field - Error case (Invalid Field)", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .patch(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send({
                                                    indicators: {
                                                      mapsViews: 2,
                                                    },
                                                  }))
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});
