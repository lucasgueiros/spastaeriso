export default function FileField (props) {
  if(props.editing) {
    return (
      <>
        <input name={props.prefix + props.property} type="file" onChange={props.onChange}></input>
      </>
    );
  } else if(props.entity){
    return (
      <>
        <a href={props.entity[props.property] + "/download"} download={true}>Download</a>
      </>
    );
  } else {
    return (
      <></>
    );
  }
}
