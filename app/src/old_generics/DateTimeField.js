export default function DateTimeField (props) {
  let value = props.entity[props.property] || '';
  if(value.length > 19) {
    value = value.slice(0,19);
  }
  return (
    <>
      <input name={props.prefix + props.property} type="datetime-local" value={value} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
