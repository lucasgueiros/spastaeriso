import './Unit.css';
import React from 'react';
import StandaloneCheckboxField from '../../../generics/StandaloneCheckboxField.js';
import StandaloneTextField from '../../../generics/StandaloneTextField.js';
import StandaloneOptionSelectField from '../../../generics/StandaloneOptionSelectField.js';

class Unit extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <StandaloneTextField {...this.props} property="name" label="Nome"/>
        <StandaloneOptionSelectField {...this.props} property="quantity" label="Grandeza">
          <option value="VOLUME">Volume</option>
          <option value="WEIGHT">Peso</option>
          <option value="TIME">Tempo</option>
          <option value="NON_CONVERTIBLE">Outros</option>
        </StandaloneOptionSelectField>
        <StandaloneCheckboxField {...this.props} property="favorite" label="Favorita?"/>
      </div>
    );
  }

}

export default Unit;
