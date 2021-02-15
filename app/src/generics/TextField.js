export default function TextField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <input name={props.prefix + props.property} type="text" value={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </div>
  );
}
