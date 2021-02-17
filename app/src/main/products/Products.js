import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigator from '../../generics/Navigator.js';
import Product from './product/Product.js';
export default function Products() {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/products/product">Produtos</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/products/product">
              <Navigator entity="products" view={<Product/>} />
            </Route>
            <Route path="/products/">
              <p>Selecione algo.</p>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
