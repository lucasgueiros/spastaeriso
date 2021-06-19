import Keycloak from 'keycloak-js'
const keycloakConfig = {
   url: 'https://auth.pastaeriso.com.br/auth',
   realm: 'spastaeriso-realm',
   clientId: 'spastaeriso-app-client'
}
export const keycloak = new Keycloak(keycloakConfig);
