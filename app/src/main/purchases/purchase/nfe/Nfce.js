import './Nfe.css';
import React from 'react';
import {StandaloneTextField} from '../../../../generics/all.js';

class Nfce extends React.Component {

  render () {
    return (
      <div class-name="nfce">
        <StandaloneTextField {...this.props} property="accessCode" label="Código de acesso"/>
      </div>
    );
  }

}

export default Nfce;
