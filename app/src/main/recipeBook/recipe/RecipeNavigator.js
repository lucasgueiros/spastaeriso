import Recipe from './Recipe.js';
import Navigator from '../../../old_generics/Navigator.js';
import RecipeCrud from './RecipeCrud.js';

function RecipeNavigator(props) {
  return (
    <div className="recipe-navigator">
      <Navigator {...props}  entity="recipes" view={<Recipe/>}/>
    </div>
  );
}

export default RecipeNavigator;
