FROM node:21-alpine3.18
RUN apk update && \
    apk add --no-cache docker
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]