FROM node:16.18.0

WORKDIR /app

COPY ./package.json ./

RUN yarn

COPY . .

CMD [ "node", "index.js" ]