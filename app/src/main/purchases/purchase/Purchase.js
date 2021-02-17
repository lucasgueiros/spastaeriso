import './Purchase.css';
import React from 'react';
import Provider from '../provider/Provider.js';
import Nfce from './nfe/Nfce.js';
import SimplerTransaction from '../../accounting/transaction/SimplerTransaction.js';
//import StandaloneNumberField from '../../../generics/StandaloneNumberField.js';
//import StandaloneLinkSelect from '../../../generics/StandaloneLinkSelect.js';
//import ListRelationView from '../../../generics/ListRelationView.js';

import {ListRelationView, RelationView, StandaloneLinkSelect, StandaloneNumberField} from '../../../generics/all.js';

import PurchaseItem from './item/PurchaseItem.js';
import axios from 'axios';

class Purchase extends React.Component {

  render () {
    return (
      <div class-name="purchase">

        <StandaloneLinkSelect {...this.props} property="provider" options="providers" label="Fornecedor"/>

        <h4>Transação</h4>
        <RelationView {...this.props} property="transaction" view={<SimplerTransaction/>}/>

        <StandaloneNumberField {...this.props} property="additionalValue" label="Valor extra"/>
        <h4>Nota fiscal</h4>
        <RelationView {...this.props} property="nfce" view={<Nfce/>}/>

        <ListRelationView {...this.props} property="items" row={<PurchaseItem/>} >
          <th>Insumo</th>
          <th>Qtd</th>
          <th>Uni</th>
          <th>Desc</th>
          <th>Marca</th>
          <th>R$/u</th>
          <th>Subtotal</th>
        </ListRelationView>
      </div>
    );
  }
}

export default Purchase;
