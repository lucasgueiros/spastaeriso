import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export function useHttp () {
  const { keycloak, initialized } = useKeycloak();
  const bearerToken = 'Bearer ' + keycloak.token;

  return axios.create({
    baseURL: "https://api.pastaeriso.com.br/v1",
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      Authorization: keycloak.authenticated ? `Bearer ${keycloak.token}` : undefined,
    }
  });
}
