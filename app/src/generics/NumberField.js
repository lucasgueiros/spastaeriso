export default function NumberField (props) {
  return (
    <>
      <input name={props.prefix + props.property} type="number" value={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
