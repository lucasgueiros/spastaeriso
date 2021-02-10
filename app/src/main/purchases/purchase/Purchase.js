import './Purchase.css';
import React from 'react';
import Provider from '../provider/Provider.js';
import SimplerTransaction from '../../accounting/transaction/SimplerTransaction.js';
import PurchaseItem from './item/PurchaseItem.js';
import axios from 'axios';

function PurchaseItems(props) {
  if(typeof props.items.map !== "function") {
    return "";
  }
  const items = props.items;
  const listItems = items.map((item,index) =>
    <PurchaseItem
      key={index}
      entity={item}
      prefix={"items."+index+"."}
      editing={props.editing}
      onChange={props.onChange}
      optionsLists={props.optionsLists} />
  );
  return listItems;
}

class Purchase extends React.Component {
  // options: units, inputs, accounts

  render () {
    return (
      <div class-name="purchase">
        <h4>Fornecedor</h4>
        <Provider
          entity={this.props.entity.provider || {}}
          prefix="provider."
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}/>
        <h4>Transação</h4>
        <SimplerTransaction
          entity={this.props.entity || {}}
          prefix=""
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          addToManyRelation={this.props.addToManyRelation}/>
        <div>
          <label htmlFor="additionalValue">Valor extra: </label>
          <input name="additionalValue" type="number" value={this.props.entity.additionalValue || 0} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <h4>Nota fiscal</h4>
        <div>
          <label htmlFor="nfe.accessCode">NFC-e: </label>
          <input name="nfe.accessCode" type="text" value={this.props.entity.nfe ? this.props.entity.nfe.accessCode : ''} readOnly={true}></input>
        </div>
        <table>
          <thead>
            <tr>
              <th>Insumo</th>
              <th>Qtd</th>
              <th>Uni</th>
              <th>Desc</th>
              <th>Marca</th>
              <th>R$/u</th>
            </tr>
          </thead>
          <tbody>
            <PurchaseItems
              items={this.props.entity.items || {}}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsLists={this.props.optionsLists}/>
          </tbody>
        </table>
        <button onClick={() => this.props.addToManyRelation(this.props.prefix + "items")}>Adicionar item</button>
      </div>
    );
  }
}

export default Purchase;
