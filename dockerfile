FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
EXPOSE 80
CMD ["node", "app.js"]