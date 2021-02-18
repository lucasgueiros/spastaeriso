import './Input.css';
import './InputAux.js';
import React from 'react';
import {StandaloneTextField, StandaloneLinkSelect, StandaloneDateField, DateField, NumberField, LinkSelect, ListRelationView} from '../../../generics/all.js';

function ProductPrice (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateField {...props} property="date"/>
      </td>
      <td>
        <NumberField {...props} property="priceByUnit"/>
      </td>
      <td>
        <LinkSelect {...props} property="unit" options="units"/>
      </td>
    </tr>
  );
}

class Input extends React.Component {

  render () {
    return (
      <div class-name="input">
        <StandaloneTextField {...this.props} property="name" label="Nome"/>
        <StandaloneTextField {...this.props} property="comment" label="Comentários"/>
        <ListRelationView {...this.props} property="prices" row={<ProductPrice/>} >
          <th>Data</th>
          <th>R$/Uni.</th>
          <th>Unidade</th>
        </ListRelationView>
      </div>
    );
  }

}

export default Input;
