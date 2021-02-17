import LinkSelect from './LinkSelect.js';

export default function StandaloneLinkSelect (props) {
  if(props.addOptionsList) {
    props.addOptionsList(props.options);
  }

  return (
    <div>
      <label htmlFor={props.prefix + props.property}>{props.label}: </label>
      <LinkSelect {...props}/>
    </div>
  );
}
