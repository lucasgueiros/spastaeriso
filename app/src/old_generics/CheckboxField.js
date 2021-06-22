export default function CheckboxField (props) {
  return (
    <>
      <input name={props.prefix + props.property} type="checkbox" checked={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </>
  );
}
