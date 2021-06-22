import DateTimeField from './DateTimeField.js';
export default function StandaloneDateTimeField (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}</label>
      <DateTimeField {...props}/>
    </div>
  );
}
