import './Recipe.css';
import React from 'react';
import Ingredient from './ingredient/Ingredient.js';
import Item from './item/Item.js';
import Instruction from './instruction/Instruction.js';
import WorkingTime from '../../people/functionary/workingTime/WorkingTime.js';

import StandaloneTextField from '../../../generics/StandaloneTextField.js';
import StandaloneDateField from '../../../generics/StandaloneDateField.js';
import StandaloneNumberField from '../../../generics/StandaloneNumberField.js';
import ListRelationView from '../../../generics/ListRelationView.js';

class Recipe extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <StandaloneTextField {...this.props} property="title" label="Título"/>
        <StandaloneDateField {...this.props} property="date" label="Data de criação"/>
        <StandaloneNumberField {...this.props} property="totalTime" label="Tempo total (min)"/>
        <StandaloneTextField {...this.props} property="comment" label="Comentários"/>

        <h4>Trabalho</h4>
        <ListRelationView {...this.props} property="works" row={<WorkingTime/>} >
          <th>Função</th>
          <th>Tempo (min)</th>
          <th>Comentários</th>
        </ListRelationView>

        <h4>Ingredientes</h4>
        <ListRelationView {...this.props} property="ingredients" row={<Ingredient/>} index="index">
          <th>#</th>
          <th>Ingrediente</th>
          <th>Quantidade</th>
          <th>Unidade</th>
          <th>Comentários</th>
        </ListRelationView>

        <h4>Outros itens</h4>
        <ListRelationView {...this.props} property="otherItems" row={<Item/>} >
          <th>Insumo</th>
          <th>Quantidade</th>
          <th>Unidade</th>
          <th>Comentários</th>
        </ListRelationView>

        <h4>Instruções</h4>
        <ListRelationView {...this.props} property="instructions" row={<Instruction/>} index="index">
          <th>#</th>
          <th>Instrução</th>
        </ListRelationView>

        <h4>Produtos</h4>
        <ListRelationView {...this.props} property="outputs" row={<Item/>} >
          <th>Insumo</th>
          <th>Quantidade</th>
          <th>Unidade</th>
          <th>Comentários</th>
        </ListRelationView>

      </div>
    );
  }

}

export default Recipe;
