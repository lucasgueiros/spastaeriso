import './Purchases.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PurchaseFromNFe from './purchase/PurchaseFromNFe.js';
import PurchaseNavigator from './purchase/PurchaseNavigator.js';
import ProviderNavigator from './provider/ProviderNavigator.js';
import PurchaseProductNavigator from './purchase/products/PurchaseProductNavigator.js';
import {InventoryMovementListView} from './inventory/InventoryMovement.js';
import {Navigator,ListView} from '../../generics/all.js';
import {ProducedProductNavigator} from './inventory/ProducedProduct.js';
import InventoryBalance from './inventory/InventoryBalance.js'

function Purchases() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/purchases/purchase">Compras</Link></li>
            <li><Link to="/purchases/inventory">Extrato do Estoque</Link></li>
            <li><Link to="/purchases/inventory/balance">Balanço do Estoque</Link></li>
            <li><Link to="/purchases/produceds">Produtos produzidos</Link></li>
            <li><Link to="/purchases/purchase/fromNFe">Enviar NFe</Link></li>
            <li><Link to="/purchases/provider">Fornecedores</Link></li>
            <li><Link to="/purchases/purchaseProduct">Mapeamento de produtos</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/purchases/produceds">
              <ProducedProductNavigator/>
            </Route>
            <Route path="/purchases/inventory/balance">
              <InventoryBalance/>
            </Route>
            <Route path="/purchases/inventory">
              <InventoryMovementListView/>
            </Route>
            <Route path="/purchases/purchaseProduct">
              <PurchaseProductNavigator/>
            </Route>
            <Route path="/purchases/provider">
              <ProviderNavigator/>
            </Route>
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
