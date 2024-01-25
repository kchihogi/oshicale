FROM node:21-alpine3.18

ARG WD="/workspace"

WORKDIR ${WD}

RUN apk update && \
    apk add bash git && \
    apk add --upgrade grep

RUN yarn global add expo-cli
RUN yarn global add eas-cli
