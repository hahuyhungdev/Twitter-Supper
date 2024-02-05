FROM node:20-alpine3.18
WORKDIR /app

RUN npm install pm2 -g
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY tsconfig.json .
COPY ecosystem.config.js .
COPY .env.production .
COPY ./src ./src



RUN apk add python3
RUN npm run build

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
