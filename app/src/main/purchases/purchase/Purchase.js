import './Purchase.css';
import React from 'react';
import Nfe from './nfe/Nfe.js';
import Provider from '../provider/Provider.js';
import Transaction from '../../finances/transaction/Transaction.js';
import PurchaseItem from './item/PurchaseItem.js';
//import InputPrice from './price/InputPrice.js';

function PurchaseItems(props) {
  const items = props.items;
  const listItems = items.map((item,index) =>
    <PurchaseItem
      entity={item}
      prefix={"items."+index+"."}
      editing={true}
      onChange={props.onChange}
    />
  );
  return listItems;
}

class Purchase extends React.Component {

  render () {
    //<Provider/>
    //<Nfe/>
    return (
      <div class-name="purchase">
        <Transaction
          entity={this.props.entity.transaction || {}}
          prefix="transaction."
          editing={this.props.editing}
          onChange={this.props.onChange}/>
        <div>
          <label htmlFor="additionalValue">Valor extra: </label>
          <input name="additionalValue" type="numeric" value={this.props.entity.additionalValue || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
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
            <PurchaseItems items={this.props.entity.items}
              onChange={this.handleInputChange}/>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Purchase;
