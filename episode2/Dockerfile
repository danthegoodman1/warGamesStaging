from ubuntu:18.04

RUN apt update
RUN apt install -y sudo
RUN apt install -y curl
RUN apt install -y systemd
RUN apt install -y openssh-server
RUN service ssh start
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
RUN echo "root:l" | chpasswd
RUN service ssh restart
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs
RUN apt install -y git

COPY . .

RUN npm i

CMD npm start
