FROM alpine:3.10

RUN mkdir -p /run/server_unity
WORKDIR /run/server_unity
COPY package*.json ./

RUN apk add --update nodejs npm
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
