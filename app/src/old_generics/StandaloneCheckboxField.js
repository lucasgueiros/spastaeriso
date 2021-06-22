import CheckboxField from './CheckboxField.js';
export default function StandaloneCheckboxField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <CheckboxField {...props}/>
    </div>
  );
}
