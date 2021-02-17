import LinkSelect from './LinkSelect.js';

export default function StandaloneLinkSelect (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <LinkSelect {...props}/>
    </div>
  );
}
