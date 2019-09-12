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

EXPOSE 3000
CMD ["npm", "run", "start"]
