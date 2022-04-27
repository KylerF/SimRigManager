#
# Docker container configuration for the SimRig Manager Angular app.
#
# Pulls the Node.js base image, copies source files into the container,
# installs dependencies and runs the application.
#

# Pull the Node.js Docker image
FROM node:lts-alpine as build

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

# Copy package.json and lockfile into the container
COPY package.json yarn.lock ./

# Install dependencies from lockfile
RUN yarn install --frozen-lockfile

# Copy the generated modules and all other files to the container
COPY . .

# The app runs on 4200 within the container, so need to expose it
EXPOSE 4200

# Run linting and tests
RUN yarn run lint
RUN yarn run e2e
RUN yarn test

# Run the app using Angular cli
CMD [ "yarn", "run", "start_lan" ]
