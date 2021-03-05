import './Main.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeBook from './recipeBook/RecipeBook.js';
import Purchases from './purchases/Purchases.js';
import Accounting from './accounting/Accounting.js';
import People from './people/People.js';
import Products from './products/Products.js';
import {ClientOrderNavigator} from './sales/ClientOrder.js';

function Main() {
  return (
    <div class-name="main">

      <Router>
        <div>
          <h1>Home</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipeBook">Livro de Receitas</Link></li>
              <li><Link to="/purchases">Compras</Link></li>
              <li><Link to="/accounting">Finanças</Link></li>
              <li><Link to="/people">Pessoas</Link></li>
              <li><Link to="/products">Produtos</Link></li>
              <li><Link to="/orders">Pedidos</Link></li>
            </ul>
          </nav>
          <div>
            <Switch>
              <Route path="/orders">
                <ClientOrderNavigator/>
              </Route>
              <Route path="/products">
                <Products/>
              </Route>
              <Route path="/accounting">
                <Accounting/>
              </Route>
              <Route path="/recipeBook">
                <RecipeBook/>
              </Route>
              <Route path="/purchases">
                <Purchases/>
              </Route>
              <Route path="/people">
                <People/>
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

export default Main;
