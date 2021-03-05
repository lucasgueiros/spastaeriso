import Recipe from './Recipe.js';
import Navigator from '../../../generics/Navigator.js';
import RecipeCrud from './RecipeCrud.js';
import CrudFactory from '../../../generics/CrudFactory.js';

function RecipeNavigator() {
  return (
    <div className="recipe-navigator">
      <Navigator crud={CrudFactory.get("recipes")}>
        <Recipe prefix=""/>
      </Navigator>
    </div>
  );
}

export default RecipeNavigator;
