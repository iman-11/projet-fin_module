
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN npm install

RUN npm run build

FROM nginx:alpine 

COPY --from=build /app/dist/test-project .

EXPOSE 80

CMD ["node", "server.js"]