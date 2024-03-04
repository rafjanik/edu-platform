FROM node:20

WORKDIR /app

RUN npm install -g npm@10.5.0 \
&& npm install -g @nestjs/cli \
&& npm install -g nodemon

COPY ./backend/package*.json .

RUN npm install

USER node

CMD [ "node", "/app/dist/main" ]

EXPOSE 3000