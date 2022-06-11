FROM node:18.3.0-alpine3.16

ARG app_path=/app/frontend
WORKDIR ${app_path}

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
