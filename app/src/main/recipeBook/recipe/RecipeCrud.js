import axios from 'axios';
import BasicCrud from '../../../old_generics/BasicCrud.js';
import ItemCrud from './item/ItemCrud.js';
import IngredientCrud from './ingredient/IngredientCrud.js';
import WorkingTimeCrud from '../../people/functionary/workingTime/WorkingTimeCrud.js';

class RecipeCrud extends BasicCrud{

  constructor () {
    super("recipes");
    this.instructionCrud = new BasicCrud("instructions");
    this.ingredientCrud = new IngredientCrud();
    this.itemCrud = new ItemCrud("items");
    this.workingTimeCrud = new WorkingTimeCrud();
  }

  async getOperation () {
    let recipes = await super.getOperation();
    for(let i =0; i < recipes.length; i++) {
      let recipe = {...recipes[i]};
      recipe = await this.workingTimeCrud.getToManyRelationOperation("works",recipe);
      recipe = await this.instructionCrud.getToManyRelationOperation("instructions",recipe);
      recipe = await this.ingredientCrud.getToManyRelationOperation("ingredients",recipe);
      recipe = await this.itemCrud.getToManyRelationOperation("otherItems",recipe);
      recipe = await this.itemCrud.getToManyRelationOperation("outputs",recipe);
      recipes[i] = recipe;
    }
    return recipes;
  }

  async postOperation (entityToSave) {
    entityToSave = await this.workingTimeCrud.postToManyRelationOperation("works",entityToSave);
    entityToSave = await this.instructionCrud.postToManyRelationOperation("instructions",entityToSave);
    entityToSave = await this.ingredientCrud.postToManyRelationOperation("ingredients",entityToSave);
    entityToSave = await this.itemCrud.postToManyRelationOperation("otherItems",entityToSave);
    entityToSave = await this.itemCrud.postToManyRelationOperation("outputs",entityToSave);

    super.postOperation(entityToSave);
  }

  async patchOperation (url, entityToSave) {
    entityToSave = await this.workingTimeCrud.patchToManyRelationOperation("works",entityToSave);
    entityToSave = await this.instructionCrud.patchToManyRelationOperation("instructions",entityToSave);
    entityToSave = await this.ingredientCrud.patchToManyRelationOperation("ingredients",entityToSave);
    entityToSave = await this.itemCrud.patchToManyRelationOperation("otherItems",entityToSave);
    entityToSave = await this.itemCrud.patchToManyRelationOperation("outputs",entityToSave);
    super.patchOperation(url, entityToSave);
  }
}

export default RecipeCrud;
