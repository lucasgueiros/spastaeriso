FROM rastasheep/ubuntu-sshd
ARG URL=192.168.0.141
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -qq update
RUN apt-get -qq -y install wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN ln -fs /usr/share/zoneinfo/America/Recife /etc/localtime
RUN apt-get install -y tzdata ssh
RUN dpkg-reconfigure --frontend noninteractive tzdata
RUN apt-get -qq update
RUN apt-get -qq install ./google-chrome-stable_current_amd64.deb --fix-missing
RUN printf "auth.pastaeriso.com.br ${URL}:8080/auth"
RUN printf "api.pastaeriso.com.br ${URL}:8090/v1"
RUN printf "app.pastaeriso.com.br ${URL}:443"
RUN echo "X11Forwarding yes" >> /etc/ssh/sshd_config
RUN sudo systemctl ssh start
RUN sudo systemctl ssh enable
EXPOSE 22
