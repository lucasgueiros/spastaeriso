PRE BUILD
- core (mvn package)
- api (mvn package)
- app (npm run build)

instalar -> postgresql ao menos

1. criar um usuário e a pasta /var/spastaeriso . chmod chown chgroup
2. criar um usuário e senha no postgresql:
   - criar um banco de dados, rodar o script de inicialização
   - popular o banco com dados básicos
  (- atualizar banco quando necessário)
3. colocar lá
   - ./api/spastaeriso.jar soft link -> ./spastaeriso-$VERSION.tar
   - ./api/spastaeriso-$VERSION.jar
   - ./api/config/application-production.properties
   - ./app/html/* -> build do npm
   - ./app/.htaccess -> configuração do apache! (static?)
   - ./auth -> instalar keycloak e configurar
   - recriar o real do keycloak
   - incluir ao menos um usuário (admin admin)
   - criar os ROLES necessários
   - copiar os SERVICES necessários (app, api, auth)
4. rodar os services!
