import DateTimeFieldWithNowButton from './DateTimeFieldWithNowButton.js';
export default function StandaloneDateTimeFieldWithNowButton (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}</label>
      <DateTimeFieldWithNowButton {...props}/>
    </div>
  );
}
