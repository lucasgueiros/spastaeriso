export default function DateField (props) {
  return (
    <>
      <input name={props.prefix + props.property} type="date" value={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
