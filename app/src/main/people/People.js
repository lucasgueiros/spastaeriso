import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FunctionaryContractTemplate from './functionary/FunctionaryContractTemplate.js';
import Navigator from '../../generics/Navigator.js';
import CrudFactory from '../../generics/CrudFactory.js';

function People() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/people/functionaryContractTemplate">Modelos de salário para as funções</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/people/functionaryContractTemplate">
              <Navigator crud={CrudFactory.get("functionaryContractTemplates")} optionsLists={['functionaryFunctions']}>
                <FunctionaryContractTemplate prefix=""/>
              </Navigator>
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
