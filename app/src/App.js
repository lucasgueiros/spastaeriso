import './App.css';
import {Main} from './main/Main.js';
import {Authentication} from './main/misc/Authentication.js';
import {CrudFactory} from './generics/CrudFactory.js';
import ModelDescription from './ModelDescription.js';
import {useHttp} from './useHttp.js';

function App() {
  return (
    <div>
      <Authentication/>
      <Main http={useHttp()} crudFactory={new CrudFactory(ModelDescription,useHttp())}/>
    </div>
  );
}

export default App;
