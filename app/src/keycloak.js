import Keycloak from 'keycloak-js'
const keycloakConfig = {
   url: 'http://localhost:8080/auth',
   realm: 'spastaeriso',
   clientId: 'react-app'
}
export const keycloak = new Keycloak(keycloakConfig);
