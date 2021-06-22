import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

export const SingleResourceManager = (props) => {
  const { path, url } = useRouteMatch();
  const View = props.view;

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <p>Aqui vão aparecer os detalhes</p>
        </Route>
        <Route path={`${path}/create`}>
          <View
            dispatch={props.dispatch}
            entity={{}}
            function="create" />
        </Route>
        <Route
          path={`${path}/:index`}>
          <View
            entities={props.entities}
            dispatch={props.dispatch}
            function={"details"} />
        </Route>
      </Switch>
    </>
  );

}
