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

const dataPut = {
  author: "Novo nome do autor",
  content: "Esta é uma nova notícia sobre saúde...",
  description: "Nova descrição da notícia",
  event: [
    "Novo evento",
  ],
  publishedAt: "2018-06-08T17:32:28Z",
  insertionDate: "2019-02-03",
  score: 6.3,
  source: "Novo nome do site da noticia",
  title: "Novo titulo da noticia",
  country: "BR",
  region: "Sul",
  uf: "PR",
  url: "novositedanoticia.com/noticia1",
  urlToImage: "novositedanoticia.com/noticia1/image.jpg",
};

test("PUT /noticias/id - Sucess case", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .put(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send(dataPut))
            .then((response: request.Response) => {
              expect(response.status).toBe(200);
              expect(response.body.data.id).toBeDefined();
              expect(response.body.data.author).toBe("Novo nome do autor");
              expect(response.body.data.content).toBe("Esta é uma nova notícia sobre saúde...");
              expect(response.body.data.description).toBe("Nova descrição da notícia");
              expect(response.body.data.event).toEqual(["Novo evento"]);
              expect(response.body.data.publishedAt).toBe("2018-06-08T17:32:28Z");
              expect(response.body.data.insertionDate).toBe("2019-02-03");
              expect(response.body.data.score).toBe(6.3);
              expect(response.body.data.source).toBe("Novo nome do site da noticia");
              expect(response.body.data.title).toBe("Novo titulo da noticia");
              expect(response.body.data.country).toBe("BR");
              expect(response.body.data.region).toBe("Sul");
              expect(response.body.data.uf).toBe("PR");
              expect(response.body.data.url).toBe("novositedanoticia.com/noticia1");
              expect(response.body.data.urlToImage).toBe("novositedanoticia.com/noticia1/image.jpg");
              }).catch(fail);
});

test("PUT /noticias/id - Invalid ID", () => {
  return request(andressTest)
          .put("/noticias/InvalidID3210")
          .auth(user, pass)
          .send(dataPut)
            .then((response: request.Response) => {
              expect(response.status).toBe(404);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});

test("PUT /noticias - Number of fields < 14", () => {
  const newDataSend = Object.assign({}, dataPut);
  delete newDataSend.author;

  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .put(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send(newDataSend))
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});

test("PUT /noticias - Number of fields > 14", () => {
  const newDataSend: any = Object.assign({}, dataPut);
  newDataSend.invalidField = 123;

  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .put(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send(newDataSend))
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});

test("PUT /noticias - Number of fields == 14 && Invalid Field", () => {
  const newDataSend: any = Object.assign({}, dataPut);
  delete newDataSend.author;
  newDataSend.invalidField = "ABC";

  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .put(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass)
                                                  .send(newDataSend))
            .then((response: request.Response) => {
              expect(response.status).toBe(400);
              expect(response.body.detail).toBeDefined();
              expect(response.body.status).toBeDefined();
            }).catch(fail);
});
