import Input from './Input.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

function InputNavigator(props) {
  return (
    <div className="input-navigator">
      <Navigator {...props}  entity="inputs" view={<Input/>}/>
    </div>
  );
}

export default InputNavigator;
