export default function FileField (props) {
  if(props.editing) {
    return (
      <>
        <input name={props.prefix + props.property} type="file" onChange={props.onChange}></input>
      </>
    );
  } else if(props.entity && props.entity._links){
    return (
      <>
        <a href={props.entity._links[props.property].href + "/download"} download>Download</a>
      </>
    );
  } else {
    return (
      <></>
    );
  }
}
