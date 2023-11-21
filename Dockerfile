FROM node:16.15.1

ARG NODE_ENV="development"

RUN mkdir -p /public/images

WORKDIR /server

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .


EXPOSE 3000

CMD npm run build && npm run start