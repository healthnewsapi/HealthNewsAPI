import { Client } from "@elastic/elasticsearch";
import { environment } from "./environment";

export const client = new Client({
  node: environment.db.url
});
