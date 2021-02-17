import './Nfe.css';
import React from 'react';
import {StandaloneTextField, FileField, RelationView} from '../../../../generics/all.js';

class Nfce extends React.Component {

  render () {
    return (
      <div class-name="nfce">
        <StandaloneTextField {...this.props} property="accessCode" label="Código de acesso"/>
        <FileField {...this.props} property="xml" fileName="nfce.xml"/>
      </div>
    );
  }

}

export default Nfce;
