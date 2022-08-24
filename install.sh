apt-get update
apt-get install -y maven apache2 openjdk-11-jdk postgresql

mkdir -p /opt/spastaeriso
cp db/init/create.sql /opt/spastaeriso/initdb.sql
chmod 500 /opt/spastaeriso/initdb.sql
su postgres --command "psql -c \"create role spastaeriso login password 'spastaeriso'\""
su postgres --command "psql -c \"create database spastaeriso with owner spastaeriso\""
su postgres --command "psql -d spastaeriso -f /opt/spastaeriso/initdb.sql"

cd core
mvn install
cd ../api
mvn package
cp target/spastaeriso-api-1.0.0.jar ~/spastaeriso-api.jar
cp spastaeriso.service /etc/systemd/system/
service spastaeriso start
systemctl enable spastaeriso

cd ../..
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 13

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source ~/.bashrc
source ~/.profile

cd spastaeriso/app
npm install
npm run build
rm -R /var/www/html/*
cp -R build/* /var/www/html/
