FROM node:21

WORKDIR /app

COPY . /app

RUN npm i --verbose

ENTRYPOINT [ "npm", "start" ]
