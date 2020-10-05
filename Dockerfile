FROM node:lts
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3003
CMD npm start
