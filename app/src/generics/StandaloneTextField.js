import TextField from './TextField.js';
export default function StandaloneTextField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <TextField {...props}/>
    </div>
  );
}
