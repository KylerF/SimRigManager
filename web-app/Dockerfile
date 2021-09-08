#
# Docker container configuration for the SimRig Manager Angular app.
#
# Pulls the Node.js base image, copies source files into the container, 
# installs dependencies and runs the application.
#

# Pull the Node.js Docker image
FROM node:alpine as base

# Create the directory inside the container
RUN mkdir -p /usr/src/web-app
WORKDIR /usr/src/web-app

# Copy the package.json files from local machine to the container
COPY package*.json .

# Install dependencies from package.json
RUN npm install

# Copy the generated modules and all other files to the container
COPY . .

# The app runs on 4200 within the container, so need to expose it
EXPOSE 4200

# Run the app using Angular cli
CMD [ "npm", "run", "start_lan" ]
