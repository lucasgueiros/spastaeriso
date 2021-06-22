import { useKeycloak } from '@react-keycloak/web';

export function Authentication (props) {
  // Using Object destructuring
  const { keycloak, initialized } = useKeycloak();

  if(!keycloak.authenticated) {
    keycloak.login();
  }

  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference

  return (
    <div>
      Autenticado como: {keycloak.idTokenParsed.name || keycloak.idTokenParsed.preferred_username} &nbsp;
      <button type="button" onClick={() => keycloak.logout()}>
        Sair
      </button>
    </div>
  );
}
