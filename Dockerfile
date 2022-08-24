FROM phusion/baseimage:jammy-1.0.0
RUN apt-get update && \
    apt-get install git maven apache2 openjdk-11-jdk postgresql && \

    # git
RUN git clone https://github.com/lucasgueiros/spastaeriso  && \
    cd spastaeriso  && \
    git checkout tags/v1.0 -b master && \
    mkdir -p /opt/spastaeriso

    # db
RUN cp db/init/create.sql /opt/spastaeriso/initdb.sql && \
    chmod 500 /opt/spastaeriso/initdb.sql && \
    su postgres --command "psql -c \"create role spastaeriso login password 'spastaeriso'\"" && \
    su postgres --command "psql -c \"create database spastaeriso with owner spastaeriso\"" && \
    su postgres --command "psql -d spastaeriso -f /opt/spastaeriso/initdb.sql"

    # core
RUN cd core && \
    mvn install

    # api
RUN cd ../api && \
    mvn package && \
    cp target/spastaeriso-api-1.0.0.jar ~/spastaeriso-api.jar && \
    cp spastaeriso.service /etc/systemd/system/ && \
    service spastaeriso start && \
    systemctl enable spastaeriso && \

    # app
RUN cd ../.. && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
    nvm install 13 && \
    cd spastaeriso/app && \
    npm install && \
    npm run build && \
    rm -R /var/www/html/* && \
    cp -R build/* /var/www/html/
