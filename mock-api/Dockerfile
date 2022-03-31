#
# Docker container configuration for the SimRig Mock API server.
#
# Pulls the Node.js base image, copies source files into the container, 
# installs dependencies and runs the application.
#

# Pull the Node.js Docker image
FROM node:lts-alpine as base

# Create the directory inside the container
RUN mkdir -p /usr/src/mock-api
WORKDIR /usr/src/mock-api

# Copy package.json and lockfile into the container
COPY package.json yarn.lock ./

# Install dependencies from lockfile
RUN yarn install --frozen-lockfile

# Copy the generated modules and all other files to the container
COPY . .

# The app runs on 8001 within the container, so need to expose it
EXPOSE 8001

# Run tests
RUN yarn test

# Run the app
CMD ["yarn", "start"]
