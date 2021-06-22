import DateField from './DateField.js';
export default function StandaloneDateField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}</label>
      <DateField {...props}/>
    </div>
  );
}
