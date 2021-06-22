import MultipleOptionSelectField from './MultipleOptionSelectField.js';


export default function StandaloneMultipleOptionSelectField (props){

    return (
      <div>
        <label htmlFor={props.prefix + props.property}>{props.label}: </label>
        <MultipleOptionSelectField {...props}/>
      </div>
    );
  
}
