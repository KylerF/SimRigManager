#
# Docker container configuration for the backend SimRig API.
#
# Pulls the base image, copies source files into the container,
# installs dependencies and runs the application.
#

# Pull the Python image
FROM python:alpine

# Create the source directory inside the container
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

# Set up a virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies:
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy source files into the container
COPY . .

# Run linter
RUN pip install pycodestyle
RUN pycodestyle .

# Run tests
RUN pip install pytest
RUN pytest

# The API runs on 8000 within the container, so need to expose it
EXPOSE 8000

# Run the application:
CMD ["python", "simriglights.py"]
