import './InputNavigator.css';
import Input from './Input.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

function InputNavigator() {
  return (
    <div className="input-navigator">
      <Navigator entity="inputs" view={<Input/>}/>
    </div>
  );
}

export default InputNavigator;
