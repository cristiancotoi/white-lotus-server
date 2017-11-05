FROM mhart/alpine-node:latest
MAINTAINER Cristian Cotoi "cristian.cotoi@gmail.com"

ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 8080

ENV SUMMARY="White Lotus Server" \
    DESCRIPTION="Chinese astrology and numerology" \
    MONGO_ADDR="mongo"

ADD package.json /tmp/package.json

RUN adduser -D -u 1000 node
RUN cd /tmp && \
    npm install
RUN mkdir -p /opt/app && \
    cp -a /tmp/node_modules /opt/app/
RUN chown -R node /opt/app

WORKDIR /opt/app
COPY . /opt/app

CMD chown -R node /opt/app && node start.js
