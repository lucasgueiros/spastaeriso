import {StandaloneLinkSelect,StandaloneTextField,StandaloneCheckboxField,Navigator} from '../../generics/all.js';

export function Card (props) {
  return (
    <div class-name="Card">
      <StandaloneTextField {...props} property="description" label="Descrição" />
      <StandaloneLinkSelect {...props} property="account" label="Conta" options="accounts"/>
      <StandaloneTextField {...props} property="cnpj" label="CNPJ do fornecedor" />
      <StandaloneCheckboxField {...props} property="favorite" label="Favorito?"/>
    </div>
  );
}

export function CardNavigator (props) {
  return (
    <Navigator {...props}  entity="cards" view={<Card/>}/>
  );
}
