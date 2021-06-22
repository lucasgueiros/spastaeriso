import OptionSelectField from './OptionSelectField.js';

export default function StandaloneOptionSelectField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <OptionSelectField {...props}/>
    </div>
  );
}
