import NumberField from './NumberField.js';
export default function StandaloneNumberField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <NumberField {...props}/>
    </div>
  );
}
