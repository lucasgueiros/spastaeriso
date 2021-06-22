import './Input.css';
import './InputAux.js';
import React from 'react';
import {StandaloneTextField, StandaloneLinkSelect, StandaloneDateField, DateField, NumberField, LinkSelect, ListRelationView} from '../../../old_generics/all.js';

function InputPrice (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateField {...props} property="date"/>
      </td>
      <td>
        <NumberField {...props} property="pricePerUnit"/>
      </td>
      <td>
        <LinkSelect {...props} property="unit" options="units" nameField="symbol"/>
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
        <ListRelationView {...this.props} property="prices" row={<InputPrice/>} >
          <th>Data</th>
          <th>R$/Uni.</th>
          <th>Unidade</th>
        </ListRelationView>
      </div>
    );
  }

}

export default Input;
