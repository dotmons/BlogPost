#To create an image for deployment
FROM node:18

# Create app directory
WORKDIR /usr/src/app

USER root
RUN apt-get update

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]

#FROM ubuntu:latest
#USER root
#WORKDIR /home/app
#RUN apt-get update
#RUN apt-get -y install nodejs

