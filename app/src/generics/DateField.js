import React, {useEffect} from 'react';

export default function DateField (props) {
  useEffect(() => {
    if((!props.entity[props.property]) && props.default) {
      props.onChange({
        target: {
          name: props.prefix + props.property,
          value: props.default,
        }
      });
    }
  },[props.entity,props.default])

  return (
    <>
      <input name={props.prefix + props.property} type="date" value={props.entity[props.property] || props.default || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
