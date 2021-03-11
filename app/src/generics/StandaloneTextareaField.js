import TextareaField from './TextareaField.js';
export default function StandaloneTextareaField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <TextareaField {...props}/>
    </div>
  );
}
