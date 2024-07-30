FROM node:20.12.2-buster-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY start.sh ./

RUN chmod +x start.sh

CMD ["./start.sh"]
