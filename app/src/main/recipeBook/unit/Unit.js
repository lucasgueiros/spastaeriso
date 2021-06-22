import React from 'react';
import StandaloneCheckboxField from '../../../generics/StandaloneCheckboxField.js';
import StandaloneTextField from '../../../generics/StandaloneTextField.js';
import {StandaloneLinkSelect} from '../../../generics/all.js';

class Unit extends React.Component {
  render () {
    return (
      <div class-name="simpler-unit">
        <StandaloneTextField {...this.props} property="name" label="Nome"/>
        <StandaloneTextField {...this.props} property="pluralizedName" label="Nome (plural)"/>
        <StandaloneTextField {...this.props} property="symbol" label="Símbolo"/>
        <StandaloneLinkSelect {...this.props} property="quantity" label="Grandeza" options="unitQuantities"/>
        <StandaloneCheckboxField {...this.props} property="favorite" label="Favorita?"/>
      </div>
    );
  }

}

export default Unit;
