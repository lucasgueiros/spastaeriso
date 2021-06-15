import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
const { REACT_APP_API_BASE_URL } = process.env;

export function useHttp () {
  const { keycloak, initialized } = useKeycloak();
  const bearerToken = 'Bearer ' + keycloak.token;

  return axios.create({
    baseURL: REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      Authorization: keycloak.authenticated ? `Bearer ${keycloak.token}` : undefined,
    }
  });
}
