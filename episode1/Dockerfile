from ubuntu:18.04

RUN apt update
RUN apt install -y sudo
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs
RUN apt install -y git
RUN npm i -g pm2

RUN apt install -y gcc

COPY . .

RUN npm i
RUN gcc badCat.c -o badCat

CMD npm start
