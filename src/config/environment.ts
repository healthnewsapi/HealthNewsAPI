
// Use the environment object to set or modify the application port

export const environment = {
  server: {
    port: process.env.SERVER_PORT_DB_API || 8080
  }
};
