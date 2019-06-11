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
COPY . .
CMD bash ./live.sh && bash
# RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
# RUN apt install -y nodejs
# RUN apt install -y git
# RUN npm i -g pm2

# RUN apt install -y gcc

# COPY . .

# RUN npm i
# RUN gcc badCat.c -o badCat

# CMD npm start
