FROM node:10
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
USER node
EXPOSE 8080
RUN yarn
CMD ["./run_server.sh"]
