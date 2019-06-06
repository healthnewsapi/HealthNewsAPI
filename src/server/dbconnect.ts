import { Client } from "@elastic/elasticsearch";
import { environment } from "./environment";

class UpDataBase {
  public client: Client;

  constructor() {
    this.client = new Client({
      node: environment.db.url,
      name: "HealthNewsAPI",
    });
    this.checkIndice();
  }

  private createIndice() {
    const mappingDB = {
      author: { type: "text" },
      content: { type: "text" },
      insertionDate: { type: "date" },
      description: { type: "text" },
      event: { type: "text" },
      publishedAt: { type: "date" },
      score: { type: "double" },
      source: { type: "text" },
      title: { type: "text" },
      region: { type: "text" },
      country: { type: "text" },
      uf: { type: "text" },
      url: { type: "text" },
      urlToImage: { type: "text" },
      indicators: {
        properties: {
          postedClipping: { type: "date" },
          markedClipping: { type: "date" },
          mapViews: { type: "long" },
          mapDetails: { type: "long" },
        },
      },
    };

    this.client.indices.create({
      index: "noticias",
      body: {
        mappings: {
          properties: mappingDB,
        },
      },
    }).then((resp) => {
      console.log(`Check Index...\n/${resp.body.index} created sucess!`);
    })
    .catch((err: Error) => { console.log(err); });
  }

  private checkIndice() {
    this.client.indices.exists(
      {
        index: "noticias",
      },
    ).then((resp) => {
      if (!resp.body) {
        this.createIndice();
      } else {
        console.log("Check Index... OK!");
      }
    })
    .catch((err: Error) => { console.log(err); });
  }

}

const client = new UpDataBase().client;
export { client };
