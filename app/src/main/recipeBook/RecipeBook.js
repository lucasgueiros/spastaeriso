import './RecipeBook.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InputNavigator from './input/InputNavigator.js';
import UnitNavigator from './unit/UnitNavigator.js';
import RecipeNavigator from './recipe/RecipeNavigator.js';

function RecipeBook() {
  return (
    <Router>
      <div>
        <h2>Livro de Receitas</h2>
        <nav>
          <ul>
            <li><Link to="/recipeBook/inputs">Insumos</Link></li>
            <li><Link to="/recipeBook/units">Unidades</Link></li>
            <li><Link to="/recipeBook/recipes">Receitas</Link></li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/recipeBook/recipes">
              <RecipeNavigator/>
            </Route>
            <Route path="/recipeBook/units">
              <UnitNavigator/>
            </Route>
            <Route path="/recipeBook/inputs">
              <InputNavigator/>
            </Route>
            <Route path="/recipeBook/">
              <p>Selecione algo.</p>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default RecipeBook;
