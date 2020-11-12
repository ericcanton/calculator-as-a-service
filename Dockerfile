FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CALC_PORT=1234

EXPOSE 1234

CMD [ "npm", "start" ]