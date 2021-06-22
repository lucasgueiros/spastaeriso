import {StandaloneLinkSelect,StandaloneTextField,Navigator} from '../../old_generics/all.js';

export function TransactionModalityNavigator (props) {
  return (<Navigator {...props}  entity="transactionModalities" view={<TransactionModality/>}/> );
}

export function TransactionModality(props) {
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Modalidade"/>
      <StandaloneTextField {...props} property="description" label="Descrição"/>
      <StandaloneLinkSelect {...props} property="favorite" options="accounts" label="Conta favorita:"/>
    </>
  );
}
