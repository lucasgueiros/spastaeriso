import React, { useEffect, useState, useReducer } from 'react';
import {firstAvaliable} from './ColumnsHelpers.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import {StandaloneField, TextField, YearField} from './BasicComponents.js';
import {useSingleResource} from './Hooks.js';

const entityReducer = (state,action) => {
  switch(action.type) {
    case 'substitute': return action.entity;
    case 'write':
      let e = state;
      let entityHierarchy = [];
      for(let i=0;i<action.path.length;i++) {
        entityHierarchy[i] = e;
        e = e[action.path[i]];
      }
      if(Array.isArray(e)) {
        e = [...e];
        e[action.property] = action.value;
      } else {
        e = {...e};
        e[action.property] = action.value;
      }

      for(let i=action.path.length-1;i>=0;i--) {
        if(Array.isArray(entityHierarchy[i])) {
          let v = e;
          e = [...entityHierarchy[i]];
          e[action.path[i]] = v;
        } else {
          let v = e;
          e = {...entityHierarchy[i]};
          e[action.path[i]] = v;
        }
      }

      return e;
    break;
    default:
      return state;
  }
}

export const GenDetails = (props) => {

  const description = props.description;
  const headerText = firstAvaliable (description, ['singularLabel','label','header']);
  let Header = () => <></>;
  let path = [];
  if(props.path) {
    path = props.path;
  }
  switch (path.length) {
    case 0:
      Header = () => <h2>{headerText}</h2>;
      break;
    default:
      Header = () => <h2>{headerText}</h2>;
  }

  let Action = () => <></>;
  /*let readOnly = true;
  switch (props.function) {
    case "create":
      readOnly = false;
      Action = () => <>
        <button onClick={() => props.dispatch({type: 'create', entity: props.entity})}>Salvar</button>
      </>;
      break;
    default:
      readOnly = true;
  }*/
  if(props.hidden) {
    return <>
      <p>Aqui vão aparecer os detalhes</p>
    </>;
  }
  const toReturn =
  <div>
    <Header/>
    <form key={path.join('.') + "_form"}>
      {
        description.columns.map((c,i) => {
          const key = path.join('.') + c.property + '_standalone';
          let TheField = TextField;
          switch(c.type) {
            case 'string':
              TheField = TextField;
            break;
              case 'year':
              TheField = YearField;
              break;
            default:
              TheField = TextField;
              break;
          }

          return <StandaloneField
                    key={key}
                    label={c.label}
                    property={c.property}
                    entity={props.entity}
                    path={path}
                    readOnly={props.readOnly}
                    Field={TheField}
                    dispatch={props.dispatch} />;
        })
      }
    </form>
    <Action/>
  </div>;

  return toReturn;

  ;
}
