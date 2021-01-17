import './InputNavigator.css';
import Input from './Input.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

function InputNavigator() {
  return (
    <div className="App">
      <Navigator crud={new BasicCrud("inputs")}>
        <Input/>
      </Navigator>
    </div>
  );
}

export default InputNavigator;
