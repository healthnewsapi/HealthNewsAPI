import "jest";
import request from "supertest";
import { environmentTest } from "../src/server/environment";

const andressTest = `http://localhost:${environmentTest.serverTest.port}`;

test("PUT /noticias/id", () => {
  const dataPost = {
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
  };

  const dataPut = {
    author: "Novo nome do autor",
    content: "Esta é uma nova notícia sobre saúde...",
    description: "Nova descrição da notícia",
    event: [
      "Novo evento",
    ],
    publishedAt: "2018-06-08T17:32:28Z",
    score: 6.3,
    source: "Novo nome do site da noticia",
    title: "Novo titulo da noticia",
    country: "BR",
    region: "Sul",
    uf: "PR",
    url: "novositedanoticia.com/noticia1",
    urlToImage: "novositedanoticia.com/noticia1/image.jpg",
  };

  return request(andressTest)
          .post("/noticias")
          .send(dataPost)
            .then((response: request.Response) => request(andressTest)
                                                  .put(`/noticias/${response.body.data.id}`)
                                                  .send(dataPut))
            .then((response: request.Response) => {
              expect(response.status).toBe(200);
              expect(response.body.data.id).toBeDefined();
              expect(response.body.data.author).toBe("Novo nome do autor");
              expect(response.body.data.content).toBe("Esta é uma nova notícia sobre saúde...");
              expect(response.body.data.description).toBe("Nova descrição da notícia");
              expect(response.body.data.event).toEqual(["Novo evento"]);
              expect(response.body.data.publishedAt).toBe("2018-06-08T17:32:28Z");
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
