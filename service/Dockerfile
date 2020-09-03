FROM node:8.11.1-alpine

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

COPY package.json /usr/src/app
RUN npm install

EXPOSE 8080
CMD [ "node", "service.js" ]