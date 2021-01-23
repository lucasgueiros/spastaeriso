import './Accounting.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AccountNavigator from './account/AccountNavigator.js';
import TransactionListView from './transaction/TransactionListView.js';

function Accounting() {
  return (
    <Router>
      <div>
        <h2>Finanças</h2>
        <nav>
          <ul>
            <li><Link to="/accounting/account">Contas</Link></li>
            <li><Link to="/accounting/transaction">Transações</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/accounting/transaction">
              <TransactionListView/>
            </Route>
            <Route path="/accounting/account">
              <AccountNavigator/>
            </Route>
            <Route path="/accounting/">
              <p>Selecione algo.</p>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default Accounting;
