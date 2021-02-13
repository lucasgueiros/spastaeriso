import Recipe from './Recipe.js';
import Navigator from '../../../generics/Navigator.js';
import RecipeCrud from './RecipeCrud.js';

function RecipeNavigator() {
  return (
    <div className="recipe-navigator">
      <Navigator crud={new RecipeCrud()} optionsLists={['inputs','units']}>
        <Recipe prefix=""/>
      </Navigator>
    </div>
  );
}

export default RecipeNavigator;
