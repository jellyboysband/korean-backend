FROM node:12

# Create app directory
WORKDIR /korean-backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./ 

RUN npm install

COPY . .

RUN DB_HOST=korean-db DB_PORT=5432 DB_DIALECT=postgres DB_NAME=postgres DB_USER=postgres DB_PASSWORD=postgres npm run db:migrate 

EXPOSE 8080
CMD [ "node", "app" ] 

