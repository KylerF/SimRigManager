#
# Docker container configuration for the backend SimRig API.
#
# Pulls the Ubuntu base image, copies source files into the container, 
# installs dependencies and runs the application.
#

# Pull the Ubuntu image
FROM ubuntu:latest

# Update and install Python
RUN apt-get update -y && apt-get install -y python3-pip python-dev

# Create the directory inside the container
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

# Copy the setup script and use it to install dependencies
COPY setup.py .
RUN pip3 install sqlalchemy
RUN python3 setup.py install

# Copy all files into the container
COPY . .

# The API runs on 8000 within the container, so need to expose it
EXPOSE 8000

# Run the API with Python
ENTRYPOINT [ "python3" ]
CMD [ "simriglights.py" ]
