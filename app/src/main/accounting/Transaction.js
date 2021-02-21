import {LinkSelect,InListRelationView,TextField,DateTimeField,NumberField,ListView} from '../../generics/all.js';

export function TransactionListView (props) {
    return (
      <>
        <h3>Transações</h3>
        <ListView entity="genericTransactions" view={<Transaction/>} />
      </>
    );

}

export function Transaction (props) {
    return (
      <>
        <tr>
          {props.children}
          <td>
            <DateTimeField {...props} property="date" />
          </td>
          <td>
            <LinkSelect {...props} property="modality" options="transactionModalities"/>
          </td>
          <td colSpan="2">Entradas:</td>
          <td>
            <TextField {...props} property="description"/>
          </td>
        </tr>
        <InListRelationView {...props} property="entries" before="2" after="1" view={<Entry/>}/>
      </>
    );
}

function Entry (props) {
  return (
    <>
      <td>
        <LinkSelect {...props} property="account" options="accounts"/>
      </td>
      <td>
        <NumberField {...props} property="value"/>
      </td>
    </>
  );
}
