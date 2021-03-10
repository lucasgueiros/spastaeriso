import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigator from '../../generics/Navigator.js';
import Product from './product/Product.js';
import ProductCosts from './product/ProductCosts.js';

export default function Products(props) {
  return (
    <Router>
      <div>
        <h2>Compras</h2>
        <nav>
          <ul>
            <li><Link to="/products/product">Produtos</Link></li>
            <li><Link to="/products/costs">Tabela de custos</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/products/costs">
              <ProductCosts {...props}/>
            </Route>
            <Route path="/products/product">
              <Navigator {...props}  entity="products" view={<Product/>} />
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
