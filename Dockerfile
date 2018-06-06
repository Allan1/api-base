FROM allanoliveira/loopback:latest

RUN npm install forever -g

# Creating app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000 587 25
# 3001 8701

#CMD slc run

CMD forever server/server.js
