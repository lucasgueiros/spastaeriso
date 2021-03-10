import React from 'react';
import {StandaloneTextField,StandaloneLinkSelect,StandaloneDateField,Navigator} from '../../generics/all.js';

export function AccountNavigator(props) {
  return (
    <Navigator {...props}  {...props} entity="accounts" view={<Account/>}/>
  );
}

export function Account (props) {
  return (
    <div class-name="input">
      <StandaloneTextField {...props} property="name" label="Nome"/>
      <StandaloneTextField {...props} property="comment" label="Comentários"/>
      <StandaloneDateField {...props} property="created" label="Criada em"/>
      <StandaloneLinkSelect {...props}
          options="accounts" label="Conta-mãe" property="motherAccount"/>
    </div>
  );
}
