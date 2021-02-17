import React from 'react';
export default function RelationView (props) {
  return (
    <>
      {React.cloneElement(props.view, {...props,
        entity: props.entity[props.property] || {},
        prefix: props.prefix + props.property + "."})}
    </>
  );
}
