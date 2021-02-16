import './Account.css';
import React from 'react';
import StandaloneTextField from '../../../generics/StandaloneTextField.js';
import StandaloneLinkSelect from '../../../generics/StandaloneLinkSelect.js';
import StandaloneDateField from '../../../generics/StandaloneDateField.js';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div class-name="input">
        <StandaloneTextField {...this.props} property="name" label="Nome"/>
        <StandaloneTextField {...this.props} property="comment" label="Comentários"/>
        <StandaloneDateField {...this.props} property="created" label="Criada em"/>
        <StandaloneLinkSelect {...this.props}
            options="accounts" label="Conta-mãe" property="motherAccount"/>
      </div>
    );
  }

}

export default Account;
