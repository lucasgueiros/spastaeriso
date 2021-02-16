export default function OptionSelectField (props) {
  return (
    <>
      <select name={props.prefix + props.property} value={props.entity[props.property] || ''} onChange={props.onChange} disabled={!props.editing}>
        {props.children}
      </select>
    </>
  );
}
