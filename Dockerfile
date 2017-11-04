FROM mhart/alpine-node:latest

ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 8080

ENV SUMMARY="White Lotus Server" \
    DESCRIPTION="Chinese astrology and numerology" \
    MONGO_ADDR="mongo"

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "start.js" ]