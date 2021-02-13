import './Recipe.css';
import React from 'react';
import Ingredient from './ingredient/Ingredient.js';
import Item from './item/Item.js';
import Instruction from './instruction/Instruction.js';

function compareInstructions( a, b ) {
  if ( a.index < b.index ){
    return -1;
  }
  if ( a.index > b.index ){
    return 1;
  }
  return 0;
}


function RecipeInstructions(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  let items = [...props.items];
  if(!props.editing) {
    items = items.sort(compareInstructions);
  }
  const listItems = items.map((item,index) =>
    <Instruction
      key={item.index}
      entity={item}
      prefix={"instructions."+index+"."}
      editing={props.editing}
      onChange={props.onChange}
      optionsLists={props.optionsLists} />
  );
  return listItems;
}

function RecipeIngredients(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  const items = props.items;
  const listItems = items.map((item,index) =>
    <Ingredient
      key={index}
      entity={item}
      prefix={"ingredients."+index+"."}
      editing={props.editing}
      onChange={props.onChange}
      optionsLists={props.optionsLists} />
  );
  return listItems;
}

function RecipeOtherItems(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  const items = props.items;
  const listItems = items.map((item,index) =>
    <tr>
      <Item
        key={index}
        entity={item}
        prefix={"otherItems."+index+"."}
        editing={props.editing}
        onChange={props.onChange}
        optionsLists={props.optionsLists} />
    </tr>
  );
  return listItems;
}

function RecipeOutputs(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  const items = props.items;
  const listItems = items.map((item,index) =>
    <tr>
      <Item
        key={index}
        entity={item}
        prefix={"outputs."+index+"."}
        editing={props.editing}
        onChange={props.onChange}
        optionsLists={props.optionsLists} />
    </tr>
  );
  return listItems;
}

class Recipe extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <div>
          <label htmlFor="title">Título: </label>
          <input name="title" type="text" value={this.props.entity.title || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="date">Data de criação: </label>
          <input name="date" type="date" value={this.props.entity.date || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="preparationTime">Tempo ativo: </label>
          <input name="preparationTime" type="text" value={this.props.entity.preparationTime || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="totalTime">Tempo de total: </label>
          <input name="totalTime" type="text" value={this.props.entity.totalTime || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="comment">Comentários: </label>
          <input name="comment" type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <h4>Ingredientes</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ingrediente</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
            <RecipeIngredients
              items={this.props.entity.ingredients || {}}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsLists={this.props.optionsLists}/>
          </tbody>
        </table>
        <button onClick={() => this.props.addToManyRelation(this.props.prefix + "ingredients")}>Adicionar</button>

        <h4>Outros itens</h4>
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
          <RecipeOtherItems
            items={this.props.entity.otherItems || {}}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsLists={this.props.optionsLists}/>
          </tbody>
        </table>
        <button onClick={() => this.props.addToManyRelation(this.props.prefix + "otherItems")}>Adicionar</button>

        <h4>Instruções</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Instrução</th>
            </tr>
          </thead>
          <tbody>
          <RecipeInstructions
            items={this.props.entity.instructions || {}}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsLists={this.props.optionsLists}/>
          </tbody>
        </table>
        <button onClick={() => this.props.addToManyRelation(this.props.prefix + "instructions")}>Adicionar</button>

        <h4>Produtos</h4>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
          <RecipeOutputs
            items={this.props.entity.outputs || {}}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsLists={this.props.optionsLists}/>
          </tbody>
        </table>
        <button onClick={() => this.props.addToManyRelation(this.props.prefix + "outputs")}>Adicionar</button>

      </div>
    );
  }

}

export default Recipe;
