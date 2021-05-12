export default function NumberField (props) {
  return (
    <>
      <input
      id={props.prefx+props.property}
      name={props.prefix + props.property}
      step="any"
      type="number" value={props.entity[props.property] == null ? '' : props.entity[props.property]} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
