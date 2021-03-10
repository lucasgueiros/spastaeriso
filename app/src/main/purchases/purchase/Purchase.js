import {DateTimeField, ListRelationView, RelationView, StandaloneLinkSelect, StandaloneNumberField,Navigator,FileField,LinkSelect,NumberField,TextField, StandaloneTextField} from '../../../generics/all.js';
import React from 'react';
import {Transaction} from '../../accounting/Transaction.js';

export function PurchaseNavigator (props) {
  return (
    <Navigator {...props}  entity="purchases" view={<Purchase/>}/>
  );
}

export function Purchase (props) {
    return (
      <div class-name="purchase">

        <StandaloneLinkSelect {...props} property="provider" options="providers" label="Fornecedor"/>

        <h4>Transação</h4>
        <RelationView {...props} property="transaction" view={<Transaction/>}/>

        <StandaloneNumberField {...props} property="additionalValue" label="Valor extra"/>
        <h4>Nota fiscal</h4>
        <RelationView {...props} property="nfce" view={<Nfce/>}/>

        <ListRelationView {...props} property="items" row={<PurchaseItem/>} >
          <th>Data</th>
          <th>Insumo</th>
          <th>Qtd</th>
          <th>Uni</th>
          <th>Desc</th>
          <th>Marca</th>
          <th>R$/u</th>
          <th>Subtotal</th>
          <th>Preço médio</th>
        </ListRelationView>
      </div>
    );
}

function Nfce (props) {
    return (
      <div class-name="nfce">
        <StandaloneTextField {...props} property="accessCode" label="Código de acesso"/>
        <FileField {...props} property="xml" fileName="nfce.xml"/>
      </div>
    );
}

export function SimplerInventoryMovement (props) {
  return (
    <>
      {props.children}
      <td>
        <DateTimeField {...props} property="date"/>
      </td>
      <td>
        <LinkSelect {...props} property="input" options="inputs"/>
      </td>
      <td>
        <div>
          <NumberField {...props} property="quantity" />
        </div>
      </td>
      <td>
        <div>
          <LinkSelect {...props} property="unit" options="units"/>
        </div>
      </td>
      <td>
        <div>
          <TextField {...props} property="comment" />
        </div>
      </td>
    </>
  );
}

export function PurchaseItem (props) {
  return (
      <tr>
        <RelationView {...props} property="inventoryMovement" view={<SimplerInventoryMovement/>}/>
        <td>
          <TextField {...props} property="brand" />
        </td>
        <td>
          <NumberField {...props} property="pricePerUnit" />
        </td>
        <td>
          <div>
            <input name="subtotal" type="number" value={props.entity.pricePerUnit * (props.entity.inventoryMovement ? props.entity.inventoryMovement.quantity : 0)} readOnly={true}></input>
          </div>
        </td>
        <td>
          <NumberField {...props} property="avgPrice"/>
        </td>
      </tr>
    );
}
