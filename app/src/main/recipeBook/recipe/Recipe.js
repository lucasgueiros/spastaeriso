import './Recipe.css';
import React from 'react';
import Ingredient from './ingredient/Ingredient.js';
import Item from './item/Item.js';
import Instruction from './instruction/Instruction.js';
import WorkingTime from '../../people/functionary/workingTime/WorkingTime.js';

class RecipeWorks extends React.Component {

  state = {
    selecteds: []
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.props.removeToManyRelation("works."+i);
      }
    }
  }

  render() {
    if(typeof this.props.items.map !== "function") {
      return "";
    }
    let items = [...this.props.items];
    let removeButton = <></>;
    if(this.props.editing) {
      removeButton = <button onClick={() => this.removeSelecteds()}>Remover</button>;
    }
    const listItems = items.map((item,index) =>
      <tr>
        <td>
          <input
            type="checkbox"
            name={index + "._selected"}
            checked={this.state.selecteds[index]}
            onChange={(event) => this.handleSelectedChange(event,index)}>
          </input>
        </td>
        <WorkingTime
          key={item.index}
          entity={item}
          prefix={"works."+index+"."}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation} />
      </tr>
    );
    return (
      <>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Função</th>
              <th>Tempo (min)</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {removeButton}
      </>
    );
  }

}

class RecipeInstructions extends React.Component {

  state = {
    selecteds: []
  }

  compareInstructions( a, b ) {
    if ( a.index < b.index ){
      return -1;
    }
    if ( a.index > b.index ){
      return 1;
    }
    return 0;
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.props.removeToManyRelation("instructions."+i);
      }
    }
  }

  render() {
    if(typeof this.props.items.map !== "function") {
      return "";
    }
    let items = [...this.props.items];
    let removeButton = <></>;
    if(!this.props.editing) {
      items = items.sort(this.compareInstructions);
    } else {
      removeButton = <button onClick={() => this.removeSelecteds()}>Remover</button>;
    }
    const listItems = items.map((item,index) =>
      <tr>
        <td>
          <input
            type="checkbox"
            name={index + "._selected"}
            checked={this.state.selecteds[index]}
            onChange={(event) => this.handleSelectedChange(event,index)}>
          </input>
        </td>
        <Instruction
          key={item.index}
          entity={item}
          prefix={"instructions."+index+"."}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation} />
      </tr>
    );
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Instrução</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {removeButton}
      </>
    );
  }

}

class RecipeIngredients extends React.Component {

  state = {
    selecteds: []
  }

  compare( a, b ) {
    if ( a.index < b.index ){
      return -1;
    }
    if ( a.index > b.index ){
      return 1;
    }
    return 0;
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.props.removeToManyRelation("ingredients."+i);
      }
    }
  }

  render() {
    if(typeof this.props.items.map !== "function") {
      return "";
    }
    let items = [...this.props.items];
    let removeButton = <></>;
    if(!this.props.editing) {
      items = items.sort(this.compare);
    } else {
      removeButton = <button onClick={() => this.removeSelecteds()}>Remover</button>;
    }
    const listItems = items.map((item,index) =>
      <tr>
        <td>
          <input
            type="checkbox"
            name={index + "._selected"}
            checked={this.state.selecteds[index]}
            onChange={(event) => this.handleSelectedChange(event,index)}>
          </input>
        </td>
        <Ingredient
          key={item.index}
          entity={item}
          prefix={"ingredients."+index+"."}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation} />
      </tr>
    );
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Ingrediente</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {removeButton}
      </>
    );
  }

}

class RecipeOtherItems extends React.Component {

  state = {
    selecteds: []
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.props.removeToManyRelation("otherItems."+i);
      }
    }
  }

  render() {
    if(typeof this.props.items.map !== "function") {
      return "";
    }
    let items = [...this.props.items];
    let removeButton = <></>;
    if(this.props.editing) {
      removeButton = <button onClick={() => this.removeSelecteds()}>Remover</button>;
    }
    const listItems = items.map((item,index) =>
      <tr>
        <td>
          <input
            type="checkbox"
            name={index + "._selected"}
            checked={this.state.selecteds[index]}
            onChange={(event) => this.handleSelectedChange(event,index)}>
          </input>
        </td>
        <Item
          key={item.index}
          entity={item}
          prefix={"otherItems."+index+"."}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation} />
      </tr>
    );
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Insumo</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {removeButton}
      </>
    );
  }

}

class RecipeOutputs extends React.Component {

  state = {
    selecteds: []
  }

  handleSelectedChange(event, index) {
    const checked = event.target.checked;
    let selecteds = [...this.state.selecteds];
    selecteds[index] = checked;
    this.setState({selecteds});
  }

  removeSelecteds () {
    for(let i = 0; i < this.state.selecteds.length; i++ ) {
      if(this.state.selecteds[i]) {
        this.props.removeToManyRelation("outputs."+i);
      }
    }
  }

  render() {
    if(typeof this.props.items.map !== "function") {
      return "";
    }
    let items = [...this.props.items];
    let removeButton = <></>;
    if(this.props.editing) {
      removeButton = <button onClick={() => this.removeSelecteds()}>Remover</button>;
    }
    const listItems = items.map((item,index) =>
      <tr>
        <td>
          <input
            type="checkbox"
            name={index + "._selected"}
            checked={this.state.selecteds[index]}
            onChange={(event) => this.handleSelectedChange(event,index)}>
          </input>
        </td>
        <Item
          key={item.index}
          entity={item}
          prefix={"outputs."+index+"."}
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation} />
      </tr>
    );
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Comentários</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
        {removeButton}
      </>
    );
  }

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
          <label htmlFor="totalTime">Tempo de total (min): </label>
          <input name="totalTime" type="text" value={this.props.entity.totalTime || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="comment">Comentários: </label>
          <input name="comment" type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>

        <h4>Trabalho</h4>
            <RecipeWorks
              items={this.props.entity.works || {}}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsLists={this.props.optionsLists}
              removeToManyRelation={this.props.removeToManyRelation}/>
        <button disabled={!this.props.editing} onClick={() => this.props.addToManyRelation(this.props.prefix + "works")}>Adicionar</button>

        <h4>Ingredientes</h4>
        <RecipeIngredients
          items={this.props.entity.ingredients || {}}
          onChange={this.props.onChange}
          editing={this.props.editing}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation}/>
        <button disabled={!this.props.editing} onClick={() => this.props.addToManyRelation(this.props.prefix + "ingredients")}>Adicionar</button>

        <h4>Outros itens</h4>
          <RecipeOtherItems
            items={this.props.entity.otherItems || {}}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsLists={this.props.optionsLists}
            removeToManyRelation={this.props.removeToManyRelation}/>
        <button disabled={!this.props.editing} onClick={() => this.props.addToManyRelation(this.props.prefix + "otherItems")}>Adicionar</button>

        <h4>Instruções</h4>
        <RecipeInstructions
          items={this.props.entity.instructions || {}}
          onChange={this.props.onChange}
          editing={this.props.editing}
          optionsLists={this.props.optionsLists}
          removeToManyRelation={this.props.removeToManyRelation}/>

        <button disabled={!this.props.editing} onClick={() => this.props.addToManyRelation(this.props.prefix + "instructions")}>Adicionar</button>
        <h4>Produtos</h4>
        <RecipeOutputs
          items={this.props.entity.outputs || {}}
          onChange={this.props.onChange}
          editing={this.props.editing}
          optionsLists={this.props.optionsLists}/>

        <button disabled={!this.props.editing} onClick={() => this.props.addToManyRelation(this.props.prefix + "outputs")}>Adicionar</button>

      </div>
    );
  }

}

export default Recipe;
