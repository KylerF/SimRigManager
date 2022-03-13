#
# Docker container configuration for the backend SimRig API.
#
# Pulls the Ubuntu base image, copies source files into the container, 
# installs dependencies and runs the application.
#

# Pull the Python image
FROM python:3.8-slim-buster

# Update and install Python
RUN apt update -y && apt install -y python3-pip python-dev python3-venv

# Create the source directory inside the container
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

# Set up a virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies:
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy source files into the container
COPY . .

# Run tests
RUN pip3 install pytest
RUN pytest

# Run linter
RUN pip3 install pycodestyle
#RUN pycodestyle .

# The API runs on 8000 within the container, so need to expose it
EXPOSE 8000

# Run the application:
CMD ["python", "simriglights.py"]
