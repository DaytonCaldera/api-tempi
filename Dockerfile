FROM node:16-alpine  

WORKDIR /app  # Set working directory

COPY package*.json ./

RUN npm install 

COPY . . 

EXPOSE 3000 

CMD ["npm", "run", "start:dev"]
