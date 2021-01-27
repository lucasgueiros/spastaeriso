import './Main.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RecipeBook from './recipeBook/RecipeBook.js';
import Purchases from './purchases/Purchases.js';
import Accounting from './accounting/Accounting.js';

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
            </ul>
          </nav>
          <div>
            <Switch>
              <Route path="/accounting">
                <Accounting/>
              </Route>
              <Route path="/recipeBook">
                <RecipeBook/>
              </Route>
              <Route path="/purchases">
                <Purchases/>
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
