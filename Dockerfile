FROM node:8-alpine

COPY ./ /opt/exchange

WORKDIR /opt/exchange

VOLUME [ "/opt/exchange" ]

RUN npm install
