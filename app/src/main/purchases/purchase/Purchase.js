import './Purchase.css';
import React from 'react';
import Provider from '../provider/Provider.js';
import SimplerTransaction from '../../accounting/transaction/SimplerTransaction.js';
import StandaloneNumberField from '../../../generics/StandaloneNumberField.js';
import StandaloneLinkSelect from '../../../generics/StandaloneLinkSelect.js';
import ListRelationView from '../../../generics/ListRelationView.js';
import PurchaseItem from './item/PurchaseItem.js';
import axios from 'axios';

class Purchase extends React.Component {

  render () {
    return (
      <div class-name="purchase">

        <StandaloneLinkSelect {...this.props} property="provider" options="providers" label="Fornecedor"/>

        <h4>Transação</h4>
        <SimplerTransaction
          entity={this.props.entity.transaction || {}}
          prefix="transaction."
          editing={this.props.editing}
          onChange={this.props.onChange}
          optionsLists={this.props.optionsLists}
          addToManyRelation={this.props.addToManyRelation}/>
          
        <StandaloneNumberField {...this.props} property="additionalValue" label="Valor extra"/>
        <h4>Nota fiscal</h4>
        <div>
          <label htmlFor="nfe.accessCode">NFC-e: </label>
          <input name="nfe.accessCode" type="text" value={this.props.entity.nfe ? this.props.entity.nfe.accessCode : ''} readOnly={true}></input>
        </div>

        <ListRelationView {...this.props} property="items" row={<PurchaseItem/>} >
          <th>Insumo</th>
          <th>Qtd</th>
          <th>Uni</th>
          <th>Desc</th>
          <th>Marca</th>
          <th>R$/u</th>
        </ListRelationView>
      </div>
    );
  }
}

export default Purchase;
