#
# Docker container configuration for the backend SimRig API.
#
# Pulls the Ubuntu base image, copies source files into the container, 
# installs dependencies and runs the application.
#

# Pull the Ubuntu image
FROM ubuntu:latest

# Update and install Python
RUN apt-get update -y && apt-get install -y python3-pip python-dev python3-venv

# Create the source directory inside the container
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

# Set up a virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies:
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy source files into the container
COPY . .

# Run tests
RUN pip3 install pytest
RUN pytest

# The API runs on 8000 within the container, so need to expose it
EXPOSE 8000

# Run the application:
CMD ["python", "simriglights.py"]
