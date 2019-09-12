FROM node:10.16.3-alpine AS builder

## Install OS dependencies
RUN apk --no-cache add \
    ca-certificates

## Copy source code
WORKDIR /opt/app
COPY . .

## Install project specific packages
RUN ["npm", "install"]

CMD ["npm", "run", "start"]
