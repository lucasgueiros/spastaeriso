import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {PurchaseFromNFe} from './purchase/PurchaseFromNFe.js';
import {PurchaseNavigator} from './purchase/Purchase.js';
import ProviderNavigator from './provider/ProviderNavigator.js';
import {PurchaseProductNavigator} from './purchase/PurchaseProduct.js';

import {InventoryMovementListView} from './inventory/InventoryMovement.js';
import {Navigator,ListView} from '../../generics/all.js';
import {ProducedProductNavigator} from './inventory/ProducedProduct.js';
import {PurchaseItemStatement} from './purchase/PurchaseItemStatement.js';
import {InputsAvgPrice} from './purchase/InputsAvgPrice.js';
import InventoryBalance from './inventory/InventoryBalance.js'

function Purchases(props) {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/purchases/purchase">Compras</Link></li>
            <li><Link to="/purchases/purchaseItemStatement">Extrato de compras</Link></li>
            <li><Link to="/purchases/inventory">Extrato do Estoque</Link></li>
            <li><Link to="/purchases/inventory/balance">Balanço do Estoque</Link></li>
            <li><Link to="/purchases/purchaseItem/avgPrice">Preço médio dos insumos</Link></li>
            <li><Link to="/purchases/produceds">Produtos produzidos</Link></li>
            <li><Link to="/purchases/fromNFe">Enviar NFe</Link></li>
            <li><Link to="/purchases/provider">Fornecedores</Link></li>
            <li><Link to="/purchases/purchaseProduct">Mapeamento de produtos</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/purchases/purchaseItem/avgPrice">
              <InputsAvgPrice {...props}/>
            </Route>
            <Route path="/purchases/purchaseItemStatement">
              <PurchaseItemStatement {...props}/>
            </Route>
            <Route path="/purchases/produceds">
              <ProducedProductNavigator {...props}/>
            </Route>
            <Route path="/purchases/inventory/balance">
              <InventoryBalance {...props}/>
            </Route>
            <Route path="/purchases/inventory">
              <InventoryMovementListView {...props}/>
            </Route>
            <Route path="/purchases/purchaseProduct">
              <PurchaseProductNavigator {...props}/>
            </Route>
            <Route path="/purchases/provider">
              <ProviderNavigator {...props}/>
            </Route>
            <Route path="/purchases/fromNFe">
              <PurchaseFromNFe {...props}/>
            </Route>
            <Route path="/purchases/purchase">
              <PurchaseNavigator {...props}/>
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
