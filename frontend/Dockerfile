FROM node:10.16.3-alpine

## Install OS dependencies
RUN apk --no-cache add \
    ca-certificates \
    bash

## Copy source code
WORKDIR /opt/app
COPY . .

## Install project specific packages
RUN ["npm", "install"]

ENV PORT 8888
EXPOSE 8888
CMD ["npm", "run", "start"]
