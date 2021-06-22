import React,{useState, useEffect, useReducer} from 'react';
import { Crud } from './RestConsumer.js';
import { useRouteMatch, useLocation, useParams, useHistory } from 'react-router-dom';

export function useBooleanArray (length, initialValue) {
  const [state, setState] = useState(new Array(length).fill(initialValue));

  const reset = (length) => {
    setState(new Array(length).fill(initialValue));
  };

  const truefy = (index) => {
    let nstate = [...state];
    nstate[index] = true;
    setState(nstate);
  };

  const falsefy = (index) => {
    let nstate = [...state];
    nstate[index] = false;
    setState(nstate);
  };

  return [state, reset, truefy, falsefy];
}

export function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  const setPersistentState = (newValue) => {
    localStorage.setItem(key,JSON.stringify(newValue));
    setState(newValue);
  }
  /*useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);*/
  return [state, setPersistentState];
}

export function useResource(http, description) {
  const [entities, setEntities] = useState([]);
  const [page,nextPage,prevPage] = useStateStep(0,1);
  const [fetching, setFetching] = useState(true);
  const [toReturnAction, setToReturnAction] = useState({type: 'nothing'});

  const { id } = useParams();
  const history = useHistory();
  const basePath = useBasePath();

  const crud = new Crud(description, http);

  const fetch = () => {
    crud.getOperation("?size=10&page="+page).then(
      (r) => {
        setEntities(r);
        //resetSelecteds(r.length);
        setFetching(false);
      }
    );
  }

  useEffect(() => { fetch(); }, [page]);

  const dispatch = (action) => {
    switch(action.type) {
      case 'fetch':
        fetch();
        break;
      case 'create':
        crud.postOperation(action.entity).then (
          (r) => {
            if(action.after) {
              action.after(r._id);
            }
            setToReturnAction({type: 'notify', notifications: [{message: description.singular + ' cadastrado(a) com sucesso'}]});
            fetch();
          },
          (e) => {
            setToReturnAction({type: 'error', error: e});
          }
        );
      break;
      case 'delete':
        crud.deleteOperation(action.entity._links.self.href).then (
          (r) => {
            if(id === action.entity.id) {
              history.push(basePath + "/");
            }
            setToReturnAction({type: 'notify', notifications: [{message: description.singular + ' deletado(a) com sucesso'}]});
            fetch();
          }
        )
      break;
      case 'nextPage': nextPage(); break;
      case 'prevPage': prevPage(); break;
      default:
    }
  };

  return [fetching, entities, dispatch, toReturnAction, page, nextPage, prevPage];
}

export function useSingleResource (http, singleParam, description, resourceDispatch) {
  const history = useHistory();
  const basePath = useBasePath();
  const {id} = useParams();
  const crud = new Crud(description,http);
  const [method, setMethod] = useState('loading');
  let e, entityHierarchy;
  const reducer = (state,action) => {
    switch(action.type) {
      case 'substitute': return action.entity;
      case 'write':
        e = state;
        entityHierarchy = [];
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
      case 'increase':
        e = state;
        entityHierarchy = [];
        for(let i=0;i<action.path.length;i++) {
          entityHierarchy[i] = e;
          e = e[action.path[i]];
        }
        if(Array.isArray(e)) {
          e = [...e];
          e.push({});
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
      case 'create':
        crud.postOperation(action.entity).then (
          (r) => {
            resourceDispatch({type: 'fetch'});
            history.push(basePath + "/" + r._id);
            //setToReturnAction({type: 'notify', notifications: [{message: description.singular + ' cadastrado(a) com sucesso'}]});
          },
          (e) => {
            //setToReturnAction({type: 'error', error: e});
          }
        );
        return state;
      break;
      case 'edit':
        setMethod('edit');
        return state;
      break;
      case 'patch':
        crud.patchOperation(action.entity._links.self.href, action.entity).then (
          (r) => {
            resourceDispatch({type: 'fetch'});
            crud.getSingleOperation(extractId(action.entity._links.self.href)).then(
              (entity) => {
                if(entity.isAxiosError && entity.response.data.error === 404) {
                  setMethod('notFound');
                } else {
                  dispatch({type: 'substitute', entity: entity});
                  setMethod('show');
                }
              }
            );
            //setToReturnAction({type: 'notify', notifications: [{message: description.singular + ' cadastrado(a) com sucesso'}]});
          },
          (e) => {
            //setToReturnAction({type: 'error', error: e});
          }
        );
        return state;
      break;
      case 'discard':
        crud.getSingleOperation(state.id).then(
              (entity) => {
                if(entity.isAxiosError && entity.response.data.error === 404) {
                  setMethod('notFound');
                } else {
                  dispatch({type: 'substitute', entity: entity});
                  setMethod('show');
                }
              }
            );
      case 'delete':
        crud.deleteOperation(state._links.self.href).then (
          (r) => {
            if(id === state.id) {
              history.push(basePath + "/");
            }
            //setToReturnAction({type: 'notify', notifications: [{message: description.singular + ' deletado(a) com sucesso'}]});
            resourceDispatch({type: 'fetch'});
          }
        )
      default:
        return state;
    }
  };

  const [entity, dispatch] = useReducer(reducer, {} );

  useEffect(()=> {
    if(singleParam == null) {
      setMethod('nothing');
    } else if(singleParam == 'create') {
      dispatch({type: 'substitute', entity: {}});
      setMethod('create');
    } else {

      crud.getSingleOperation(singleParam).then(
        (entity) => {
          if(entity.isAxiosError && entity.response.data.error === 404) {
            setMethod('notFound');
          } else {
            dispatch({type: 'substitute', entity: entity});
            setMethod('show');
          }
        }
      );
    }
  }, [singleParam]);

  let readOnly = true;
  if (method === 'create' || method === 'edit') {
    readOnly = false;
  }

  return [entity, dispatch, readOnly, method];
}

export const useBasePath = () => {
    const location = useLocation();
    const params = useParams();

    return Object.values(params).reduce(
        (path, param) => path.replace('/' + param, ''),
        location.pathname,
    );
};

export function extractId(url) {
  return url.match("[\s\S]+?\/([0-9]+)$")[1];
}

export function useStateStep(initialValue, step) {
  const [value, setValue] = useState(initialValue);
  const next = () => setValue(value+step);
  const prev = () => setValue(value-step);
  return [value,next,prev];
}
