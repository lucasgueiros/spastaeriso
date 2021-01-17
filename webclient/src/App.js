import './App.css';
import Input from './recipeBook/input/Input.js';
import Navigator from './generics/Navigator.js';
import BasicCrud from './generics/BasicCrud.js';

function App() {
  return (
    <div className="App">
      <Navigator crud={new BasicCrud("inputs")}>
        <Input/>
      </Navigator>
    </div>
  );
}

export default App;
