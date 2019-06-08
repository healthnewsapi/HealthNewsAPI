FROM node:10
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN yarn
COPY . /app
EXPOSE 8080
CMD ["./run_server.sh"]
