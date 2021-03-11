export default function TextareaField (props) {
  return (
    <>
      <textarea name={props.prefix + props.property} type="text" value={props.entity[props.property] || ''} onChange={props.onChange} readOnly={!props.editing}/>
    </>
  );
}
