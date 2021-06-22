import React from 'react';

export const StandaloneTextField = (props) => <StandaloneField {...props} Field={TextField}/>;
export const StandaloneYearField = (props) => <StandaloneField {...props} Field={YearField}/>;

export const StandaloneField = (props) => {
  const key = props.path.join('.') + '.' + props.property;
  return (
    <div>
      <label htmlFor={key}>{props.label}: </label>
      <props.Field key={key + '_field'} {...props}/>
    </div>
  );
}

export const TextField = (props) => {
  const key = props.path.join('.') + '.' + props.property;
  return (
      <input
        id={key} name={key} key={key}
        type="text"
        value={props.entity[props.property] || ''}
        readOnly={props.readOnly}
        onChange={(e) => props.dispatch({
          type: 'write',
          path: props.path,
          property: props.property,
          value: e.target.value,
        })}
        >
      </input>
  );
}

export const NumberField = (props) => {
  const key = props.path.join('.') + '.' + props.property;
  return (
      <input
        id={key} name={key} key={key}
        type="number"
        value={props.entity[props.property] || ''}
        readOnly={props.readOnly}
        onChange={(e) => props.dispatch({
          type: 'write',
          path: props.path,
          property: props.property,
          value: e.target.value,
        })}
        >
      </input>
  );
}

export const YearField = (props) => {
  const key = props.path.join('.') + '.' + props.property;
  if(!props.entity[props.property]) {
    props.dispatch({
      type: 'write',
      path: props.path,
      property: props.property,
      value: new Date().getFullYear(),
    });
  }
  return (
    <input
      id={key} name={key} key={key}
      type="number" step="1"
      readOnly={props.readOnly}
      onChange={(e) => props.dispatch({
        type: 'write',
        path: props.path,
        property: props.property,
        value: e.target.value,
      })}
      value={props.entity[props.property]}>
    </input>
  );
}

export const ToManyRelationSubform = ({entity,relation,path,dispatch,children,readOnly}) => {
  let entities = entity[relation];
  if(!entities) {
    dispatch({
      type: 'write',
      path: [...path],
      property: relation,
      value: [{}]
    });
    return <></>;
  }
  let result = entities.map((entity,index) => {
    const thePath = [...path, relation, index];
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          path: thePath,
          entity: entity,
          dispatch: dispatch,
          readOnly: readOnly
        });
      });
    return <>
      {childrenWithProps}
    </>;
  });

  return <>{result}</>;
}

export const Table = ({header,path,entity,dispatch,children,readOnly,footer}) => {
  const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        path: path,
        entity: entity,
        dispatch: dispatch,
        readOnly: readOnly
      });
    });
  return <table>
    <thead>
      {header}
    </thead>
    <tbody>
      {childrenWithProps}
    </tbody>
    <tfoot>
      {footer}
    </tfoot>
  </table>;
}

export const Row = ({path,entity,children,readOnly,dispatch}) => {
  const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        path: path,
        entity: entity,
        readOnly: readOnly,
        dispatch: dispatch
      });
    });

  return <tr>{childrenWithProps}</tr>;
}

export const ToManyRelationTable = ({header,path,entity,dispatch,children,readOnly,relation}) => {
  return <Table
    header={header}
    path={path}
    entity={entity}
    dispatch={dispatch}
    readOnly={readOnly}
    footer={<><AddToManyRelationButton
        path={path}
        entity={entity}
        dispatch={dispatch}
        readOnly={readOnly}
        relation={relation}
      /></>}>
    <ToManyRelationSubform relation={relation}>
      <Row>
        {children}
      </Row>
    </ToManyRelationSubform>
  </Table>;
};

export const AddToManyRelationButton = ({path,entity,dispatch,readOnly,relation}) => {
  if(readOnly) return <></>;
  let thePath = path;
  if(relation){
    thePath = [...path, relation];
  }
  return <button onClick={() => {dispatch({
    type: 'increase',
    path: thePath
  })}}>Adicionar</button>;
}

export const Cell = ({path,entity,children,readOnly,dispatch}) => {
  const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        path: path,
        entity: entity,
        readOnly: readOnly,
        dispatch: dispatch
      });
    });

  return <td>{childrenWithProps}</td>;
}

export const RelationSubform = ({entity,path,children,dispatch,readOnly,relation}) => {
  const thePath = [...path, relation];
  let theEntity = entity[relation];
  if(!theEntity) {
    dispatch({
      type: 'write',
      path: [...path],
      property: relation,
      value: {}
    });
    return <></>;
  }
  const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        path: thePath,
        entity: theEntity,
        readOnly: readOnly,
        dispatch: dispatch
      });
    });

  return <>{childrenWithProps}</>;
}

export const Details = ({method,entity,children,dispatch,readOnly}) => {
  if (method === 'create') {
    const path = [];
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          path: path,
          entity: entity,
          readOnly: readOnly,
          dispatch: dispatch
        });
      });
    return <>
      {childrenWithProps}
      <button onClick={() => dispatch({type: 'create', entity: entity})}>Salvar</button>
      <button onClick={() => dispatch({type: 'discard'})}>Descartar</button>
    </>;
  } else if (method === 'edit') {
    const path = [];
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          path: path,
          entity: entity,
          dispatch: dispatch,
          readOnly: readOnly
        });
      });
    return <>
      {childrenWithProps}
      <button onClick={() => dispatch({type: 'patch', entity: entity})}>Salvar</button>
      <button onClick={() => dispatch({type: 'discard'})}>Descartar</button>
    </>;
  } else if (method == 'nothing') {
    return <p>Aqui vão aparecer os detalhes.</p>;
  } else if (method == 'loading') {
    return <p>Carregando</p>;
  } else if (method == 'show') {
    const path = [];
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          path: path,
          entity: entity,
          dispatch: dispatch,
          readOnly: readOnly
        });
      });
    return <>
      {childrenWithProps}
      <button onClick={() => dispatch({type: 'edit', entity: entity})}>Alterar</button>
      <button onClick={() => dispatch({type: 'delete'})}>Apagar</button>
    </>;
  } else if (method == 'notFound') {
    return <p>Não encontrado</p>
  }
}
