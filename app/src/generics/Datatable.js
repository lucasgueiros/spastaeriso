import React, { useEffect, useState, useReducer } from 'react';
import { useBooleanArray, useResource, useBasePath, extractId} from './Hooks.js';
import { Crud } from './RestConsumer.js';
import {showOnDatatable} from './ColumnsHelpers.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";

export const Datatable = (props) => {
  // Router
  const basePath = useBasePath();
  const history = useHistory();

  // STATE TRACKING
  const [selecteds, resetSelecteds, select, unselect] = useBooleanArray(0, false);
  const [entities, dispatch] = [props.entities, props.dispatch];

  // fetching?
  if(props.fetching) {
    return <p>Carregando...</p>
  }

  // pieces
  const Actions = ({id,entity}) =>
    <>
      <button onClick={() => history.push(basePath + "/" + id)}>Detalhes</button>
      <button onClick={() => dispatch({type:'delete', entity: entity})}>Apagar</button>
    </>;

  const Selector = ({i}) =>
    <input
      type="checkbox"
      name={i + "._selected"}
      checked={selecteds[i]}
      onChange={ (e) => e.target.checked ? select(i) : unselect(i) } >
    </input>;

  // renomeando pra ficar mais bonito
  let Headers = props.headers;

  if(!props.headers) {
    Headers = ({SelectorHeader,ActionsHeader}) =>
      <tr>
        <th><SelectorHeader/></th>
        {props.description.map ((row,j) => <th>{row.header}</th>)}
        <th><ActionsHeader/></th>
      </tr>;
  }

  // creating rows from data
  let rows = entities.map ((entity,i) =>
    <tr>
      <td>
        <Selector i={i}/>
      </td>
      {props.description.map ((row,j) => <td><row.render entity={entity}/></td>)}
      <td>
        <Actions id={extractId(entity._links.self.href)} entity={entity}/>
      </td>
    </tr>
  );


  return (
    <div>
      <table>
        <thead>
          <Headers
           SelectorHeader={(props) => <>#</>}
           ActionsHeader={(props) => <>Ações</>} />
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="100">
              <button onClick={() => dispatch({type: 'prevPage'})}>Anterior</button>
              <button onClick={() => dispatch({type: 'nextPage'})}>Próxima</button>
            </td>
          </tr>
            <tr>
              <td colSpan="100">
                <button onClick={() => history.push(basePath + "/create")}>Adicionar</button>
                <button onClick={()=>dispatch({type:'delete'})}>Apagar</button>
              </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
}
