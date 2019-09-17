FROM node:10.16.3-alpine

# Install OS dependencies
RUN apk --no-cache add \
    ca-certificates \
    bash

WORKDIR /opt/app

# Expose app port
EXPOSE 3000

# Set the default command to run when a container starts
CMD ["npm", "run", "start:dev"]

# Install project specific packages
COPY package.json .
COPY package-lock.json .
RUN ["npm", "install"]

# Copy source code
COPY . .
