FROM alpine:latest

ARG DOMAIN
WORKDIR /server/${DOMAIN}

RUN apk update && \
  apk add openssl

ENV PRIKEY=/server/${DOMAIN}/privkey.pem
ENV PUBKEY=/server/${DOMAIN}/fullchain.pem
CMD openssl req -x509 -nodes -newkey rsa:4096 -sha256 -days 365 -keyout ${PRIKEY} -out ${PUBKEY} -subj "/CN=localhost"
