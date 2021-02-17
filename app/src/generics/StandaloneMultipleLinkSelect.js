import MultipleLinkSelect from './MultipleLinkSelect.js';

export default function StandaloneMultipleLinkSelect (props) {
  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <MultipleLinkSelect {...props}/>
    </div>
  );
}
