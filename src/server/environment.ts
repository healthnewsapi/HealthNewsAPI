// Use the environment object to set or modify the application port

export const environment = {
  db: {
    url: process.env.URL_DB_NEWS || "http://localhost:9200",
  },
  server: {
    port: process.env.SERVER_PORT_DB_API || 8080,
  },
};
