import Keycloak from 'keycloak-js'
const keycloakConfig = {
   url: 'http://auth:8080/auth',
   realm: 'spastaeriso-realm',
   clientId: 'spastaeriso-app-client'
}
export const keycloak = new Keycloak(keycloakConfig);
