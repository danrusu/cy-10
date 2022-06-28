FROM cypress/included:10.2.0

WORKDIR /opt/

COPY cypress/ ./cypress
COPY cypress.config.js ./
COPY package.json ./

 RUN npm install \
   @badeball/cypress-cucumber-preprocessor@11.3.0 \
   @cypress/browserify-preprocessor@3.0.2

# base image: ENTRYPOINT [ "cypress", "run" ]