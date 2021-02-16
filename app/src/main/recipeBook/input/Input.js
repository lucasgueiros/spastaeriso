import './Input.css';
import './InputAux.js';
import React from 'react';
import StandaloneTextField from '../../../generics/StandaloneTextField.js';
import StandaloneLinkSelect from '../../../generics/StandaloneLinkSelect.js';
import StandaloneDateField from '../../../generics/StandaloneDateField.js';

class Input extends React.Component {

  render () {
    return (
      <div class-name="input">
        <StandaloneTextField {...this.props} property="name" label="Nome"/>
        <StandaloneTextField {...this.props} property="comment" label="Comentários"/>
      </div>
    );
  }

}

export default Input;
