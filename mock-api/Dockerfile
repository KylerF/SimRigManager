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

# Copy the package.json files from local machine to the container
COPY package*.json .

# Install dependencies from package.json
RUN npm install

# Copy the generated modules and all other files to the container
COPY . .

# The app runs on 8001 within the container, so need to expose it
EXPOSE 8001

# Run tests
RUN npm test

# Run the app
CMD ["npm", "start"]
