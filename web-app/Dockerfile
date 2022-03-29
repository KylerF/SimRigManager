#
# Docker container configuration for the SimRig Manager Angular app.
#
# Pulls the Node.js base image, copies source files into the container,
# installs dependencies and runs the application.
#

# Pull the Node.js Docker image
FROM node:lts-alpine as base

# Install Chrome Headless for testing
RUN echo http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo http://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories \
    && apk --no-cache update && apk --no-cache upgrade \
    && apk add --no-cache chromium \
    && rm -rf /var/cache/apk/* /tmp/*

ENV CHROME_BIN /usr/bin/chromium-browser

# Create the directory inside the container
RUN mkdir -p /usr/src/web-app
WORKDIR /usr/src/web-app

# Copy the package.json files from local machine to the container
COPY package*.json ./

# Install dependencies from package-lock.json
RUN npm ci

# Copy the generated modules and all other files to the container
COPY . .

# The app runs on 4200 within the container, so need to expose it
EXPOSE 4200

# Run linting and tests
RUN npm run lint
RUN npm test
RUN npm run e2e

# Run the app using Angular cli
CMD [ "npm", "run", "start_lan" ]
