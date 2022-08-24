import './App.css';
import {Main} from './main/Main.js';
//import {Authentication} from './main/misc/Authentication.js';
import {CrudFactory} from './old_generics/CrudFactory.js';
import ModelDescription from './ModelDescription.js';
import {useHttp} from './useHttp.js';

      /*<Authentication/>*/
function App() {
  return (
    <div>
      <h2>Sistema Pasta e Riso</h2>
      <Main http={useHttp()} crudFactory={new CrudFactory(ModelDescription,useHttp())}/>
    </div>
  );
}

export default App;
