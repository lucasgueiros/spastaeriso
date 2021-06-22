import Input from './Input.js';
import Navigator from '../../../old_generics/Navigator.js';
import BasicCrud from '../../../old_generics/BasicCrud.js';

function InputNavigator(props) {
  return (
    <div className="input-navigator">
      <Navigator {...props}  entity="inputs" view={<Input/>}/>
    </div>
  );
}

export default InputNavigator;
