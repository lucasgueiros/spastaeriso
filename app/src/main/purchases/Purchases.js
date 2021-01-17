import './Purchases.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePurchaseFromNFe from './purchase/CreatePurchaseFromNFe.js';

function Purchases() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/purchases/purchase/createPurchaseFromNFe">Enviar NFe</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/purchases/purchase/createPurchaseFromNFe">
              <CreatePurchaseFromNFe/>
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
