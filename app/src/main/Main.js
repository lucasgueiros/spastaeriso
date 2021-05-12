import './Main.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeBook from './recipeBook/RecipeBook.js';
import Purchases from './purchases/Purchases.js';
import Accounting from './accounting/Accounting.js';
import People from './people/People.js';
import Products from './products/Products.js';
import {ClientOrderNavigator} from './sales/ClientOrder.js';
import { useKeycloak } from '@react-keycloak/web';
import {Deliveryman} from './sales/Deliveryman.js';
import {Delivery} from './sales/Delivery.js';
import {Navigator} from '../generics/all.js';
import {UnitQuantity} from './recipeBook/unit/UnitQuantity.js';
import {DeliveryPricesByNeighborhoodListView} from './sales/DeliveryPriceByNeighborhood.js';

export function Main(props) {
  return (
    <div class-name="main">

      <Router>
        <div>
          <h1>Home</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to="/recipeBook">Livro de Receitas</Link>
                <ul>
                  <li><Link to="/recipeBook/unitQuantities">Grandezas</Link></li>
                </ul>
              </li>
              <li><Link to="/purchases">Compras</Link></li>
              <li><Link to="/accounting">Finanças</Link></li>
              <li><Link to="/people">Pessoas</Link></li>
              <li><Link to="/products">Produtos</Link></li>
              <li>
                <Link to="/orders">Pedidos</Link>
                <ul>
                  <li><Link to="/orders/deliveryman">Entregadores</Link></li>
                  <li><Link to="/orders/deliveries">Entregas</Link></li>
                  <li><Link to="/orders/deliveryPrice">Preço por entrega</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div>
            <Switch>
              <Route path="/orders/deliveryPrice">
                <DeliveryPricesByNeighborhoodListView {...props}/>
              </Route>
              <Route path="/orders/deliveries">
                <Navigator {...props} entity="deliveries" view={<Delivery/>}/>
              </Route>
              <Route path="/orders/deliveryman">
                <Navigator {...props} entity="deliverymen" view={<Deliveryman/>}/>
              </Route>
              <Route path="/orders">
                <ClientOrderNavigator {...props}/>
              </Route>
              <Route path="/products">
                <Products {...props}/>
              </Route>
              <Route path="/accounting">
                <Accounting {...props}/>
              </Route>
              <Route path="/recipeBook/unitQuantities">
                <Navigator {...props} entity="unitQuantities" view={<UnitQuantity/>}/>
              </Route>
              <Route path="/recipeBook">
                <RecipeBook {...props}/>
              </Route>
              <Route path="/purchases">
                <Purchases {...props}/>
              </Route>
              <Route path="/people">
                <People {...props}/>
              </Route>
              <Route path="/">
                <p>Essa é a Homepage</p>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
