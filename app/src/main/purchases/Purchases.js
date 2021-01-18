import './Purchases.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PurchaseFromNFe from './purchase/PurchaseFromNFe.js';
import PurchaseNavigator from './purchase/PurchaseNavigator.js';

function Purchases() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/purchases/purchase">Compras</Link></li>
            <li><Link to="/purchases/purchase/fromNFe">Enviar NFe</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/purchases/purchase/fromNFe">
              <PurchaseFromNFe/>
            </Route>
            <Route path="/purchases/purchase">
              <PurchaseNavigator/>
            </Route>
            <Route path="/purchases/">
              <p>Selecione algo.</p>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default Purchases;
