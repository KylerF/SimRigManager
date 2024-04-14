FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Create the directory inside the container
RUN mkdir -p /usr/src/web-app
WORKDIR /usr/src/web-app

RUN npx playwright install --with-deps

EXPOSE 8080

CMD [ "npx", "playwright", "test", "--ui", "--ui-port=8080", "--ui-host=0.0.0.0" ]
