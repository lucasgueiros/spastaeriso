export default function TextField (props) {
  return (
    <>
      <input name={props.prefix + props.property} type="text" value={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
