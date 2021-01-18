import './Purchase.css';
import React from 'react';
import Provider from '../provider/Provider.js';
import Transaction from '../../finances/transaction/Transaction.js';
import PurchaseItem from './item/PurchaseItem.js';

function PurchaseItems(props) {
  const items = props.items;
  const listItems = items.map((item,index) =>
    <PurchaseItem
      key={index}
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
        <Provider
          entity={this.props.entity.provider || {}}
          prefix="provider."
          editing={this.props.editing}
          onChange={this.props.onChange}/>
        <Transaction
          entity={this.props.entity.transaction || {}}
          prefix="transaction."
          editing={this.props.editing}
          onChange={this.props.onChange}/>
        <div>
          <label htmlFor="nfe.accessCode">NFC-e: </label>
          <input name="nfe.accessCode" type="text" value={this.props.entity.nfe.accessCode || ''} readOnly={true}></input>
        </div>
        <div>
          <label htmlFor="additionalValue">Valor extra: </label>
          <input name="additionalValue" type="numeric" value={this.props.entity.additionalValue || 0} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
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
              items={this.props.entity.items}
              onChange={this.props.onChange}/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Purchase;
