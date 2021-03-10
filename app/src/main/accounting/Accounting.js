import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {AccountNavigator} from './Account.js';
import {TransactionListView} from './Transaction.js';
import {CardNavigator} from './Card.js';
import {TransactionModalityNavigator} from './TransactionModality.js';
import {AccountingBalance} from './AccountingBalance.js';

function Accounting(props) {
  return (
    <Router>
      <div>
        <h2>Finanças</h2>
        <nav>
          <ul>
            <li><Link to="/accounting/account">Contas</Link></li>
            <li><Link to="/accounting/transaction">Transações</Link></li>
            <li><Link to="/accounting/cards">Cartões</Link></li>
            <li><Link to="/accounting/modalities">Modalidades</Link></li>
            <li><Link to="/accounting/balance">Relatório financeiro</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/accounting/balance">
              <AccountingBalance {...props}/>
            </Route>
            <Route path="/accounting/modalities">
              <TransactionModalityNavigator {...props}/>
            </Route>
            <Route path="/accounting/cards">
              <CardNavigator {...props}/>
            </Route>
            <Route path="/accounting/transaction">
              <TransactionListView {...props}/>
            </Route>
            <Route path="/accounting/account">
              <AccountNavigator {...props}/>
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
