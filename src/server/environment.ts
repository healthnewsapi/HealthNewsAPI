// Use the environment object to set or modify the application port

const environment = {
  db: {
    url: process.env.URL_DB_NEWS || "http://localhost:9200",
  },
  server: {
    port: process.env.SERVER_PORT_API || 8080,
  },
};

const environmentTest = {
  dbTest: {
    url: process.env.URL_DB_NEWS_TEST || "http://localhost:9001",
  },
  serverTest: {
    port: process.env.SERVER_PORT_API_TEST || 3001,
  },
};

export {
  environment,
  environmentTest,
}
