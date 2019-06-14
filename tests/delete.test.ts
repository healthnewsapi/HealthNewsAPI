import "jest";
import request from "supertest";
import { environmentTest } from "../src/server/environment";

const andressTest = `http://localhost:${environmentTest.serverTest.port}`;
const [user, pass] = environmentTest.authTest.apiKey.split(":");

test("DELETE without ID /noticias", () => {
  return request(andressTest)
          .delete("/noticias")
          .auth(user, pass)
          .then((response: request.Response) => {
                expect(response.status).toBe(405);
              }).catch(fail);
});

test("DELETE /noticias/NonExistentID", () => {
  return request(andressTest)
          .delete("/noticias/NonExistentID")
          .auth(user, pass)
          .then((response: request.Response) => {
                expect(response.status).toBe(404);
              }).catch(fail);
});

test("DELETE /noticias/id", () => {
  return request(andressTest)
          .post("/noticias")
          .auth(user, pass)
          .send({
              author: "Autor",
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
            })
            .then((response: request.Response) => request(andressTest)
                                                  .delete(`/noticias/${response.body.data.id}`)
                                                  .auth(user, pass))
            .then((response: request.Response) => {
                expect(response.status).toBe(200);
              }).catch(fail);
});
