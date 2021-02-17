import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigator from '../../generics/Navigator.js';
import CrudFactory from '../../generics/CrudFactory.js';

import FunctionaryContractTemplate from './functionary/FunctionaryContractTemplate.js';
import FunctionaryFunction from './functionary/FunctionaryFunction.js';

function People() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/people/functionaryContractTemplate">Modelos de salário para as funções</Link></li>
            <li><Link to="/people/functionaryFunction">Funções</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/people/functionaryFunction">
              <Navigator entity="functionaryFunctions" view={<FunctionaryFunction/>} />
            </Route>
            <Route path="/people/functionaryContractTemplate">
              <Navigator entity="functionaryContractTemplates" view={<FunctionaryContractTemplate/>} />
            </Route>
            <Route path="/people/">
              <p>Selecione algo.</p>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default People;
